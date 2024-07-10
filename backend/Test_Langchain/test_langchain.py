import os

from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq


# Get Groq API key
#groq_api_key = os.environ["GROQ_API_KEY"]
groq_chat = ChatGroq(groq_api_key="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", model_name="llama3-70b-8192")

system_prompt = "あなたは便利なアシスタントです。"
conversational_memory_length = 5

memory = ConversationBufferWindowMemory(
    k=conversational_memory_length, memory_key="chat_history", return_messages=True
)

while True:
    user_question = input("質問を入力してください: ")

    if user_question.lower() == "exit":
        print("Goodbye!")
        break

    if user_question:
        # Construct a chat prompt template using various components
        prompt = ChatPromptTemplate.from_messages(
            [
                # 毎回必ず含まれるSystemプロンプトを追加
                SystemMessage(content=system_prompt),
                # ConversationBufferWindowMemoryをプロンプトに追加
                MessagesPlaceholder(variable_name="chat_history"),
                # ユーザーの入力をプロンプトに追加
                HumanMessagePromptTemplate.from_template("{human_input}"),
            ]
        )

        conversation = LLMChain(
            llm=groq_chat,
            prompt=prompt,
            verbose=False,
            memory=memory,
        )
        response = conversation.predict(human_input=user_question)

        print("User: ", user_question)
        print("Assistant:", response)