バック側概要:
構成
create_index.py :ナレッジ作成用pythonファイル
chat.py         :バックのmain

使用手順
1. ナレッジの作成
    chatのRAG機能に必要なナレッジの作成を行う。
    ./dataフォルダにナレッジに使用するtxtファイルを入れる。(複数可)
    その後create_index.pyを実行する。(必要があれば実行ファイル内のパラメータを編集)
    ./storageフォルダに[index.faiss, index.pkl]が作成される。

2. main.pyを実行
    main.pyを実行し、質問を入力する。
    ※ただし現段階ではフロント側の入力との合わせが出来ていないため恐らくエラーになる。
    　フロント側からの入力の想定は 問文(str), チャット履歴(str)←Discordに送られていた形式を想定しています。
    
    いい感じに合わせちゃってください。


以下、想定しているチャット履歴の入力です

"""
chatLog: [
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
"""