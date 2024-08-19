from langchain.prompts import PromptTemplate
from langchain_community.vectorstores.faiss import FAISS
from langchain_community.embeddings import BedrockEmbeddings
from langchain_aws import ChatBedrock
from langchain_core.prompts import ChatPromptTemplate
import os
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"

# 取得してくるナレッジのクラス定義
class Document:
    def __init__(self, metadata, page_content):
        self.metadata = metadata
        self.page_content = page_content


def chat_title_creation(chat_log):
    # チャット履歴の整形
    chatlog = [line for line in chat_log.splitlines() if not line.startswith("      timestamp")]
    log = '\n'.join(chatlog)

    # モデルの設定
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"
    llm = ChatBedrock(
        model_id=model_id,
        model_kwargs={"temperature": 0.6}
    ) 

    prompt = PromptTemplate.from_template("""
    あなたはチャットのタイトルを生成してください。生成にはそれまでの過去の会話の履歴:「{chatLog}」を基に相応しいタイトルを作成してください。
    また回答は、生成されたタイトルのみにしてください。
    """)

    # chainの定義
    chain = prompt | llm

    # chainの実行
    create_title = chain.invoke({"chatLog":log})

    #タイトルをreturn
    return create_title.content


# 過去の履歴を踏まえたナレッジ検索文を生成
def search_sentence_creation(user_input,log):

    # モデルの設定
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"
    llm = ChatBedrock(
        model_id=model_id,
        model_kwargs={"temperature": 0.5}
    )    

    prompt = PromptTemplate.from_template("""
    あなたは検索文を生成してください。生成にはUserの「{question}」と、それまでの過去の会話の履歴:「{chatLog}」との関係性も踏まえて作成してください。
    また回答は、生成された検索文のみにしてください。
    """)

    # chainの定義
    chain = prompt | llm

    # chainの実行
    create_question = chain.invoke({"question": user_input, "chatLog":log})
    #print(create_question.content)

    #質問文をreturn
    return create_question.content


# チャット機能
def chatbedrock(user_input,chat_log,search_number = 5):

    # チャット履歴の整形
    chatlog = [line for line in chat_log.splitlines() if not line.startswith("      timestamp")]
    log = '\n'.join(chatlog)

    # モデルの設定
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"
    llm = ChatBedrock(
        model_id=model_id,
        model_kwargs={"temperature": 0.1}
    )

    # 埋め込みモデルの読み込み
    embedding_model = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")
    # インデックスのパス
    index_path = "./storage"
    # インデックスの読み込み
    index = FAISS.load_local(
        allow_dangerous_deserialization = True,
        folder_path=index_path, 
        embeddings=embedding_model
    )
    # 検索機能の設定
    retriever=index.as_retriever(search_kwargs={'k': search_number})#デフォルトでは関連度上位4件を取得

    # chat文生成用のプロンプトテンプレート
    prompt_main = ChatPromptTemplate.from_messages(
        [
            (
                "あなたは○○を対象にしたサポートチャットです。"
                "サポートの内容は、○○に関する情報を質問に応じて提供することです。"
                "Userの質問「question」に対して、渡された情報「context」と今までのchat履歴「chatLog」を基に回答を行ってください。"
                "回答の際に、参照元が明確な場合は回答の最後にsourceを基に参照元を示してください。"
                "例:参照元:○○"
                "など"
                "また、情報がない場合は、嘘は書かず、再度の質問を促してください。"
                "---------------"
                "question: {question}"
                "context: {context}"
                "chatLog: {chatLog}",
            ),

            ("human", "{question}"),
        ]
    )

    # chainの設定 プロンプトの完成 → llmによるチャット文生成
    chain = prompt_main | llm

    # 検索用の検索文作成
    create_question = search_sentence_creation(user_input,log)

    # チャット文作成用のナレッジの取得
    docs = retriever.invoke(create_question)
    
    # 必要ならdocsの情報も提供可能
    #source_page_content_pairs = [(doc.metadata['source'], doc.page_content) for doc in docs]

    # chainの実行
    ans = chain.invoke({"question":user_input, "context":docs, "chatLog":log})

    #chat文をreturn
    return ans.content