# 0. 環境構築
wsl2 dockerそのへんは前提条件
## 0.1 クローン
> [!WARNING]
> **wsl内で**作業してね
```bash
cd ~
gh repo clone hiroaki222/kashihara-app
```
## 0.1 Dev Containersを入れる
[Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)拡張機能を入れる．
## 0.2 コンテナ起動
1. [フォルダーを開く]から`kashihara-app`を開く
2. コマンドパレットを開く([F1] or ［Ctrl］＋［Shift］＋［P］)
3. 「dev containers open folder in container」を入力してenter
4. 開きたい方のコンテナを選ぶ
## 0.3 github cliの認証
```bash
gh auth login
```
## 0.4 環境に変更があったとき
1. コマンドパレットを開く([F1] or ［Ctrl］＋［Shift］＋［P］)
2. 「dev containers rebuild in container」を入力してひたすらenter
あとはウィザードに従って認証を完了しろ．
# 1. フロントエンド/バックエンド用のコンテナに入る方法
1. [リモートエクスプローラ](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)拡張機能を入れる．
2. vscodeの横のバーからリモートエクスプローラのアイコンを選択
3. プルダウンメニューから[開発コンテナー]を選択
4. [∨開発コンテナー]から[kashihara-app (frontend / backend)_container]にカーソルを合わせる
5. 表示されるボタンから任意のものを選択
# 2. ブランチを切りましょう
## 2.1 ブランチ命名則
[この記事](https://qiita.com/konatsu_p/items/dfe199ebe3a7d2010b3e)の内容に沿ってやってこう．  
例 : `feat: 〇〇なため、△△を追加`
perfixは以下
- feat: 新しい機能
- fix: バグの修正
- docs: ドキュメントのみの変更
- style: 空白、フォーマット、セミコロン追加など
- refactor: 仕様に影響がないコード改善(リファクタ)
- perf: パフォーマンス向上関連
- test: テスト関連
- chore: ビルド、補助ツール、ライブラリ関連

コミットメッセージは日本語でもいいよ
## 2.2 ブランチの切り方
1. vscodeの横のバーからgitの拡張機能を開く
2. [・・・] → [ブランチ] → [ブランチの作成]
### 2.2.1 ブランチ名の命名則
[この記事](https://qiita.com/c6tower/items/fe2aa4ecb78bef69928f)を参考にやっていこう．
ブランチ名|役割|派生元|マージ先
---|---|---|---
main(master)|公開するものを置くブランチ
develop|開発中のものを置くブランチ|main(master)|main(master)
release|次にリリースするものを置くブランチ|develop|develop, main(master)
feature-*|新機能開発中に使うブランチ|develop|develop
hotfix-*|公開中のもののバグ修正用ブランチ|main(master)|develop, main(master)

あと，前に「名前/」つけること．  
例 : `hiroaki222/feature-newpage` とか `hiroaki222/hotfix-bug`
> [!CAUTION]
> **ブランチ名は日本語NG**