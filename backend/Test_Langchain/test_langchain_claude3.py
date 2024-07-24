import os
import boto3
import base64
from dotenv import load_dotenv

import langchain
from langchain.prompts import (
    ChatPromptTemplate, 
    MessagesPlaceholder, 
)

from langchain_community.chat_models import BedrockChat
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.schema import (
    messages_from_dict, 
    messages_to_dict,
    AIMessage,
    HumanMessage,
)

# 環境変数をロードする
# .envに定義した環境変数は AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,AWS_REGION, AWS_DEFAULT_REGION の４つ
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

s3 = boto3.resource('s3')
MEMORY_BUCKET = "claude3-memory"
PROMPT_BUCKET = "claude3-prompt"
IMAGE_BUCKET = "claude3-image"
memory_bucket = s3.Bucket(MEMORY_BUCKET)
prompt_bucket = s3.Bucket(PROMPT_BUCKET)
image_bucket = s3.Bucket(IMAGE_BUCKET)

PROMPT_NAME = "zunda_prompt.txt"


def load_propmt():
    '''
    S3バケットからシステムプロンプトをロードする
    '''
    obj = prompt_bucket.Object(PROMPT_NAME)

    response = obj.get()    
    prompt = response['Body'].read().decode('utf-8')

    return prompt
    

def save_memory(memory, session_id):
    '''
    会話履歴をS3バケットに保存する。
    （履歴データは「{session_id}.json」というファイルで管理）

    Parameters
    ----------
    memory : ConversationBufferMemory
        保存したい会話履歴
    session_id : string
        会話のセッション番号
    '''
    
    object_key_name = '{}.json'.format(session_id)
    obj = memory_bucket.Object(object_key_name)

    save = obj.put(Body = json.dumps(messages_to_dict(memory.chat_memory.messages)))

def load_memory(session_id):
    '''
    会話履歴をS3からロードする

    Parameters
    ----------
    session_id : string
        会話のセッション番号

    Return
    ----------
    memory : ConversationBufferMemory
        会話履歴
    '''
    
    object_key_name = '{}.json'.format(session_id)
    obj = memory_bucket.Object(object_key_name)

    try:
        response = obj.get()    
        body = response['Body'].read()

        json_data = json.loads(body.decode('utf-8'))

        # ロードした会話履歴データをConversationBufferMemoryに詰め込む
        memory = ConversationBufferMemory(return_messages=False, human_prefix="H", assistant_prefix="A")
        memory.chat_memory.messages = messages_from_dict(json_data)

    except:
        # 会話履歴データがない場合はConversationBufferMemory生成のみ
        memory = ConversationBufferMemory(return_messages=False, human_prefix="H", assistant_prefix="A")

    return memory


def chat(message, session_id):
    '''
    ユーザーのメッセージを元にBedrock(Claude3)のモデルを実行し、結果を返す

    Parameters
    ----------
    message: string or dict
        ユーザーのメッセージ。画像の場合は文字列情報に加え、画像のイメージURLが含まれる
    session_id : string
        会話のセッション番号

    Return
    ----------
    response : string
        モデルの実行結果
    '''

    # システムプロンプトのロード
    system_prompt = load_propmt()

    # 会話履歴のロード
    memory=load_memory(session_id)
    messages = memory.chat_memory.messages

    # プロンプトテンプレートの作成（会話履歴は"history"に入ることになる）
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="history"),
        MessagesPlaceholder(variable_name="human_input")
    ])
    
    # モデルにClaude3 Sonnetを選択 
    LLM = BedrockChat(
        model_id = "anthropic.claude-3-sonnet-20240229-v1:0",
        region_name = "us-east-1"
    )

    # チェーンを作成（参考：https://python.langchain.com/docs/expression_language/cookbook/prompt_llm_parser）
    chain = prompt | LLM

    # チェーンの実行
    human_input = [HumanMessage(content=message)]
    resp = chain.invoke(
        {
            "history": messages,
            "human_input": human_input,
        }
    )

    response = resp.content

    # ユーザーのメッセージを会話履歴に追加
    if type(message) == str:
        memory.chat_memory.messages.append(human_input[0])
    else:
         # 画像が含まれる場合は画像URLは履歴に含めない
        text = list(filter(lambda item : item['type'] == 'text', message))[0]['text']
        memory.chat_memory.messages.append(HumanMessage(content=text))
        
    # AIのメッセージを会話履歴に追加
    memory.chat_memory.messages.append(AIMessage(content=response))
    # 会話履歴を保存
    save_memory(memory, session_id)

    return response

if __name__ == "__main__":
    # 単なる文字のみのメッセージの場合のchatの実行
    message = chat("こんにちは, 私はyu_Matsuです", "0001")

    # 画像を含むメッセージの場合のchatの実行
    # S3から画像をロードする
    obj = image_bucket.Object("dog_image.jpeg")
    response = obj.get()
    body = response["Body"].read()
    
    # モデルに渡すためにBase64でエンコード必要がある
    encoded_string = base64.b64encode(body).decode("utf-8")

    message = chat([
        {"type": "image_url", "image_url": { "url": "data:image/jpeg;base64,"+encoded_string } },
        {
            "type": "text",
            "text": "この画像について教えて、ずんだもん",
        },
    ], "1000")
    
    print(message)

