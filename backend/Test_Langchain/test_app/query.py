from langchain.embeddings import BedrockEmbeddings
import os
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"
from langchain_aws import ChatBedrock 

# * embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")

# Chromaデータベースの設定
CHROMA_PERSIST_DIR = "db/persistent_storage"

#//def query_data(query):
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
#//return response

print(response)