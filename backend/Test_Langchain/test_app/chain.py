from langchain.prompts import PromptTemplate
from langchain_community.llms.llamacpp import LlamaCpp
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_community.vectorstores.faiss import FAISS
from langchain_aws import ChatBedrock 
from langchain.embeddings import BedrockEmbeddings
from langchain.memory import ConversationBufferMemory
import os
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"

def chatbedrock(user_input):
    #* 埋め込みモデルの読み込み
    embedding_model = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")

    # インデックスのパス
    index_path = "./storage"

    # インデックスの読み込み
    index = FAISS.load_local(
        allow_dangerous_deserialization = True,
        folder_path=index_path, 
        embeddings=embedding_model
    )
    retriever=index.as_retriever(search_kwargs={'k': 4})

    #* プロンプトテンプレートの定義
    #* 中身を目的に沿った内容に編集してください
    template = """

    knowledge:{context}
    
    あなたは、橿原市役所の職員をサポートするチャットAIです。
    職員の質問に対して、情報を参考に回答してください。
    回答の際に、参照元が明確な場合は参照元を示してください。
    例:第7編教育 橿原市教育委員会会議規則第1章
       第2編議会 橿原市の休日を定める条例（平成元年橿原市条例第２号）
       など
    また、情報がない場合は、嘘は書かず、再度の質問を促してください。
    
    Question: {question}
    Answer: """

    # プロンプトの設定
    prompt = ChatPromptTemplate.from_template(template)

    #* モデルの設定
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"
    llm = ChatBedrock(
        model_id=model_id,
        model_kwargs={"temperature": 0.5}
    )

    memory = ConversationBufferMemory(
        return_messages=True, output_key="answer", input_key="question"
    )


    # chainを作成
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    ans = chain.invoke(user_input)

    return ans