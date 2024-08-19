import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Homepage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#" prefetch={false}>
          <Avatar className="size-10">
            <AvatarImage src="/neurology.svg" />
          </Avatar>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#" prefetch={false}>
            ドキュメント
          </Link>
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#" prefetch={false}>
            機能
          </Link>
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#" prefetch={false}>
            使い方
          </Link>
          <form action="/login">
            <Button type="submit" variant="default">
              アカウント作成 / ログイン
            </Button>
          </form>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container space-y-10 xl:space-y-16">
            <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  組織専用のAIアシスタント
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  外部のインターネットに接続せずにあなたの組織の情報をもとに質問に答えるAIアシスタントです。
                </p>
                <div className="space-x-4">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    href="/chat"
                    prefetch={false}
                  >
                    質問を始める
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">主な特徴</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">安全と効率の両立</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  外部ネットワークにアクセスせず、あなたの組織の情報をもとに回答するAIアシスタントです。
                </p>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  情報漏洩の心配をすることなく、業務を効率化することができます。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">独自ネットワーク下で動作</h3>
                <p className="text-sm text-muted-foreground">
                  外部ネットワークから隔離されたネットワーク下においても安全に動作します。
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">組織専用の知識ベース</h3>
                <p className="text-sm text-muted-foreground">
                  あなたの組織の情報をもとに回答するため、的確で信頼性の高い情報を提供します。
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">簡単操作で高度な支援</h3>
                <p className="text-sm text-muted-foreground">
                  ITの専門知識がなくても、誰でも簡単に利用できる直感的な操作画面を意識して設計しました。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 International Professional University of Technology in Osaka. Created by students of the 2024
          Practical Training Program. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#" prefetch={false}>
            プライバシー
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#" prefetch={false}>
            コンタクト
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#" prefetch={false}>
            GitHub
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="/YtqGjNX9Rcry" prefetch={false}>
            管理者用ページ
          </Link>
        </nav>
      </footer>
    </div>
  )
}
