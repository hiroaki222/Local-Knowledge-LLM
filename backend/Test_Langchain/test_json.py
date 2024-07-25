import json

with open("./chat_log.json") as f:
    data = json.load(f)

ChatLog = ""

for log in data["chatLog"]:
    ChatLog += log["role"]
    ChatLog += log["content"]


print(ChatLog)





