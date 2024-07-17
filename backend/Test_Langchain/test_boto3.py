#boto3を使ってbedrockのllmを呼ぶ

import boto3
import json
bedrock = boto3.client(service_name='bedrock-runtime')

body = json.dumps({
    "prompt": "\n\nHuman:KDDIアジャイル開発センターってどんな会社？\n\nAssistant:",
    "max_tokens_to_sample": 300,
    "temperature": 0.1,
    "top_p": 0.9,
})

modelId = 'anthropic.claude-v2'
accept = 'application/json'
contentType = 'application/json'

response = bedrock.invoke_model(body=body, modelId=modelId, accept=accept, contentType=contentType)
response_body = json.loads(response.get('body').read())

# text
print(response_body.get('completion'))


# リージョンのエラーが出た場合 → aws configure set region us-east-1 --profile <プロファイル名>
