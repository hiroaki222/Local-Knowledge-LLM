from fastapi import FastAPI
import uvicorn
from chat import chatbedrock
from chat import chat_title_creation

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get('/chat/{prompt}')
def get_chat(prompt: str = None):
    # 引数に質問文とチャット履歴(前discordに貼ってくれたテキストの形式)を渡してください。
    ans = chatbedrock(prompt,chatlog)
    return {"response": ans}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)