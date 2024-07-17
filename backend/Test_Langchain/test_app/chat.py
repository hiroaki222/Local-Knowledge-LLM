import os
from langchain_aws import ChatBedrock 
from langchain.prompts import PromptTemplate
from langchain.embeddings import BedrockEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import CSVLoader

def chatbedrock(question):
    os.environ["AWS_DEFAULT_REGION"] = "us-east-1"
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"

    llm = ChatBedrock(
        model_id=model_id,
        model_kwargs={"temperature": 0.9}
    )

    prompt = PromptTemplate(
        input_variables=["product"],
        template="あなたは橿原市役所の職員を対象にしたサポートチャットボットです。質問:{product}に対して回答を行ってください",
    )

    from langchain.chains import LLMChain
    chain = LLMChain(llm=llm, prompt=prompt)
    ans = chain.run(question)
    
    return ans

def embedding():
    os.environ["AWS_DEFAULT_REGION"] = "us-east-1"
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"

    # テキストの作成
    #loader = CSVLoader(file_path="/data/data.csv")
    #documents = loader.load()
    #text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=0)
    #texts = text_splitter.split_documents(documents)
# ドキュメントの準備
    texts = [
        "橿原市の市長は亀田忠彦",
        "橿原市役所の住所は、奈良県橿原市内膳町1-1-60",  
    ]

    # エンベディング用モデル
    embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")

    # VectorStoreの準備
    vectorstore = Chroma.from_texts(
        texts,
        embedding=embeddings,
    )

    # Retrieverの準備
    chroma_retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 1},
    )