from langchain.prompts import PromptTemplate
from langchain_community.llms.llamacpp import LlamaCpp

from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_community.vectorstores.faiss import FAISS
 
from langchain.embeddings import BedrockEmbeddings
from langchain.memory import ConversationBufferMemory
import os
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"


from langchain_aws import ChatBedrock
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough


def chatbedrock(user_input):
    #* モデルの設定
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"
    llm = ChatBedrock(
        model_id=model_id,
        model_kwargs={"temperature": 0.5}
    )


    #* 埋め込みモデルの読み込み
    embedding_model = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")
    # インデックスのパス
    index_path = "./storage"
    # インデックスの読み込み
    index = FAISS.load_local(
        #allow_dangerous_deserialization = True,
        folder_path=index_path, 
        embeddings=embedding_model
    )
    retriever=index.as_retriever(search_kwargs={'k': 4})

    prompt_pre = PromptTemplate.from_template("""
    あなたは検索ツールへの入力となる検索文を作成します。
    Userの「{question}」という質問と過去の会話の履歴[user]:「{user}」、[ai]:「{ai}」との関係性も踏まえて検索文を作成してください。
    回答形式は文字列です
    """)

    prompt_main = PromptTemplate.from_template("""
    あなたは市の職員を対象にしたサポートチャットです。Userの質問「{question}」に対して、渡された情報「{context}」と今までのchat履歴[User]:「{user}」、[AI]:「{ai}」を基に回答を行ってください。
    """)


    chain = (
        {"context": prompt_pre | llm | retriever, "question":  RunnablePassthrough(), "user": RunnablePassthrough(), "ai": RunnablePassthrough()}
        | prompt_main 
        | llm
    )

    chain = (
        {"context": prompt_pre | llm | retriever, "question":  RunnablePassthrough(), "user": RunnablePassthrough(), "ai": RunnablePassthrough()}
        | prompt_main 
        | llm
    )



    user_log = '"橿原市の議員数は？"'
    ai_log = '"23人です。"'

    ans = chain.invoke(
        {
            "question": user_input,
            "user" : user_log,
            "ai" : ai_log,
        }
    )

    return ans
