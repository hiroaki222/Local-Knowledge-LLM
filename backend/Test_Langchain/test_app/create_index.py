from langchain_community.vectorstores.faiss import FAISS
#from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader

from langchain.embeddings import BedrockEmbeddings
import os
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"

# 資料の格納場所（ディレクトリ）
data_dir = "./data"

# ベクトル化したインデックスの保存場所（ディレクトリ）
index_path = "./storage"

# ディレクトリの読み込み
loader = DirectoryLoader(data_dir)

#* 埋め込みモデルの読み込み
embedding_model = BedrockEmbeddings(model_id="cohere.embed-multilingual-v3")

# テキストをチャンクに分割
split_texts = loader.load_and_split(
    text_splitter=CharacterTextSplitter(
        separator = "\n\n"
        chunk_size=1000,#* 分割したチャンクごとの文字数
        chunk_overlap=150  #* チャンク間で被らせる文字数
    )
)

# インデックスの作成
index = FAISS.from_documents(
    documents=split_texts,
    embedding=embedding_model,
)

# インデックスの保存
index.save_local(
    folder_path=index_path
)