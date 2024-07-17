import os
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"

from langchain_aws import ChatBedrock 
from langchain.prompts import PromptTemplate

def chatbedrock(question):
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