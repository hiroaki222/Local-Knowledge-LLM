import boto3
from langchain.prompts import *
from langchain.chains import *

class ChatBot:
    def __init__(self, model_id):
        self.model_id = model_id

        # Bedrockクライアントを作成
        self.bedrock_client = boto3.client('bedrock')

        # LangChainのコンポーネントを作成
        self.llm_chain = Chain(
            PromptTemplate(
                text="ユーザー: $message\n\nBedrock: $response"
            ),
            self.bedrock_invoke_model
        )

    def bedrock_invoke_model(self, message):
        response = self.bedrock_client.invoke_model(
            ModelId=self.model_id,
            Prompt=message
        )
        return response['GeneratedText']

    def chat(self):
        while True:
            # ユーザーからのメッセージを取得
            message = input('ユーザー: ')

            # LangChainを使用してBedrock LLMにメッセージを送信し、応答を取得
            response = self.llm_chain.run({
                'message': message
            })

            # 応答を表示
            print(f'Bedrock: {response["response"]}')



model_id = 'anthropic.claude-3-haiku-20240307-v1:0'
chatbot = ChatBot(model_id)
chatbot.chat()