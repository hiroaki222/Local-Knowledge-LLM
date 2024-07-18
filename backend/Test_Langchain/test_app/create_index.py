from langchain_community.vectorstores.faiss import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
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
split_texts = f.load_and_split(
    text_splitter=RecursiveCharacterTextSplitter(
        chunk_size=500,#* 分割したチャンクごとの文字数
        chunk_overlap=50  #* チャンク間で被らせる文字数
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