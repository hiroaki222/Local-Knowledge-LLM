import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Homepage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#" prefetch={false}>
          <Avatar className="size-10">
            <AvatarImage src="/neurology.svg" />
          </Avatar>
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#" prefetch={false}>
            機能
          </Link>
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#" prefetch={false}>
            ドキュメント
          </Link>
          <form action='/login'>
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
                  The complete platform for building the Web
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable.
                  Open Source.
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
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">New Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Faster iteration. More innovation.</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The platform for rapid progress. Let your team focus on shipping features instead of managing
                  infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Infinite scalability, zero config</h3>
                <p className="text-sm text-muted-foreground">
                  Enable code to run on-demand without needing to manage your own infrastructure or upgrade hardware.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Real-time insights and controls</h3>
                <p className="text-sm text-muted-foreground">
                  Get granular, first-party, real-user metrics on site performance per deployment.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Personalization at the edge</h3>
                <p className="text-sm text-muted-foreground">
                  Deliver dynamic, personalized content, while ensuring users only see the best version of your site.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
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
          <Link className="text-xs underline-offset-4 hover:underline" href="#" prefetch={false}>
            管理者用ページ
          </Link>
        </nav>
      </footer>
    </div>
  )
}