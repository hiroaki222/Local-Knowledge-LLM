from langchain_community.document_loaders import CSVLoader
from langchain.text_splitter import CharacterTextSplitter

# テキストの作成
loader = CSVLoader(file_path="test_app/data/data.csv")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

print(texts)