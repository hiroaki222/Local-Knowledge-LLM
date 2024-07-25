import json

a = [
          {
            timestamp: ISODate('2024-07-19T10:00:00.000Z'),
            role: 'user',
            content: 'こんにちは、AIさん。'
          },
          {
            timestamp: ISODate('2024-07-19T10:00:05.000Z'),
            role: 'ai',
            content: 'こんにちは！どのようなお手伝いができますか？'
          },
          {
            timestamp: ISODate('2024-07-19T10:05:00.000Z'),
            role: 'user',
            content: 'AIの歴史について教えてください。'
          },
          {
            timestamp: ISODate('2024-07-19T10:05:10.000Z'),
            role: 'ai',
            content: 'AIの歴史は1950年代に始まり、様々な発展を遂げてきました。主な出来事として...'
          }
        ]

for a in chatLog:
    print(

b = chatLog

a = json.loads(b) 

print("a:{}".format(type(a)))


        