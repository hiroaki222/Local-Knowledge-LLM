from langchain.embeddings import BedrockEmbeddings
import os
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"
from langchain_aws import ChatBedrock 
import chromadb

# * embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")

# Chromaデータベースの設定
CHROMA_PERSIST_DIR = "db/persistent_storage"

# //def load_and_embed_data():
loader = CSVLoader(file_path="/data/data.csv")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

#embeddings = OpenAIEmbeddings()
embeddings = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")
vectorstore = Chroma.from_documents(texts, embeddings, persist_directory=CHROMA_PERSIST_DIR)
vectorstore.persist()
print("データがエンベディングされ、ベクトルデータベースが更新されました。")