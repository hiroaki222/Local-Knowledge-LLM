import os
from langchain_aws import ChatBedrock 
from langchain.prompts import PromptTemplate
from langchain.embeddings import BedrockEmbeddings
import chromadb
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
    
    # * embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")

    # Chromaデータベースの設定
    CHROMA_PERSIST_DIR = "db/persistent_storage"

    loader = CSVLoader(file_path="/data/data.csv")
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=0)
    texts = text_splitter.split_documents(documents)

    embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")
    vectorstore = Chroma.from_documents(texts, embeddings, persist_directory=CHROMA_PERSIST_DIR)
    vectorstore.persist()
    print("データがエンベディングされ、ベクトルデータベースが更新されました。")