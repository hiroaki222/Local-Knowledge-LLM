# 独立ネットワーク環境向けチャットボット
<div id="top"></div>

## 使用技術一覧
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white) ![AWS Bedrock](https://img.shields.io/badge/AWS%20Bedrock-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white) ![LangChain](https://img.shields.io/badge/LangChain-000000?style=for-the-badge&logo=chainlink&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Devcontainer](https://img.shields.io/badge/Devcontainer-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 目次
1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

## プロジェクトについて
このプロジェクトは、独立ネットワーク環境で動作する，特化型チャットボットを開発することを目的としている．インターネットに接続できない環境下でも利用可能で，高度な自然言語処理機能を持つLLMの構築を目指している．

### 主な機能
- ログイン機能（LDAP認証対応）
- チャット履歴の保存
- 管理機能
- RAG（Retrieval-Augmented Generation）による情報検索・回答生成

## 環境
| 言語・フレームワーク | バージョン |
| --------------------- | ---------- |
| Python | 3.12 |
| TypeScript | 5 |
| langchain | 0.2.7 |
| numpy | 1.26.4 |
| Next.js | 14.2.4 |
| React | 18 |
| tailwindcss | 3.4.1 |

## ディレクトリ構成
```bash
$ tree -a -L 4 -d -I "node_modules|.git"
.
├── .devcontainer
│   ├── backend
│   └── frontend
├── backend
├── docs
└── frontend
    └── next
        ├── .next
        │   ├── cache
        │   ├── server
        │   ├── static
        │   └── types
        ├── public
        └── src
            ├── app
            └── lib

23 directories
```

## 開発環境構築

### 前提条件
- Dockerがインストールされる

### セットアップ手順
1. リポジトリのクローン
```bash
git clone https://github.com/hiroaki222/Local-Knowledge-LLM
cd Local-Knowledge-LLM
```

2. Dockerコンテナの構築と起動
```bash
docker-compose up -d --build
```

3. 開発サーバーへのアクセス:
http://localhost:8000

<p align="right">(<a href="#top">トップへ</a>)</p>