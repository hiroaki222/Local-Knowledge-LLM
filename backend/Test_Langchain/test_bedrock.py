import os

os.environ["AWS_DEFAULT_REGION"] = "us-east-1"

from langchain_aws import ChatBedrock 
from langchain.prompts import PromptTemplate

model_id = "anthropic.claude-3-haiku-20240307-v1:0"

llm = ChatBedrock(
    model_id=model_id,
    model_kwargs={"temperature": 0.9}
)

prompt = PromptTemplate(
    input_variables=["product"],
    template="{product}を製造する会社にとって、どのような会社名が良いでしょうか？",
)

from langchain.chains import LLMChain
chain = LLMChain(llm=llm, prompt=prompt)

# Run the chain only specifying the input variable.
print(chain.run("カラフルなソックス"))