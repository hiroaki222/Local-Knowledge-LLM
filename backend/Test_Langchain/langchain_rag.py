from langchain.embeddings import BedrockEmbeddings
import os
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"
from langchain_aws import ChatBedrock 

# * embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")

# Chromaデータベースの設定
CHROMA_PERSIST_DIR = "db/persistent_storage"

def load_and_embed_data():
    loader = CSVLoader(file_path="/data/data.csv")
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=0)
    texts = text_splitter.split_documents(documents)
    
    #embeddings = OpenAIEmbeddings()
    embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")
    vectorstore = Chroma.from_documents(texts, embeddings, persist_directory=CHROMA_PERSIST_DIR)
    vectorstore.persist()
    st.success("データがエンベディングされ、ベクトルデータベースが更新されました。")

def query_data(query):
    #embeddings = OpenAIEmbeddings()
    embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")
    vectorstore = Chroma(persist_directory=CHROMA_PERSIST_DIR, embedding_function=embeddings)
    
    #llm = ChatOpenAI(model_name="gpt-4o", temperature=0)
    model_id = "anthropic.claude-3-haiku-20240307-v1:0"
    llm = ChatBedrock(
        model_id=model_id,
        model_kwargs={"temperature": 0.9}
    )
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="map_reduce",
        retriever=vectorstore.as_retriever()
    )
    
    response = qa_chain.run(query)
    return response






from langchain.prompts import PromptTemplate
# promptの作成
prompt = PromptTemplate.from_template("""
質問に答えてください

質問: {question}""")

from langchain.chains import LLMChain

# chainの作成
#chain = prompt | model
chain = LLMChain(llm=llm, prompt=prompt)

chain.invoke({'question':'あいみょんとは誰ですか'})
