import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Page() {
    return <>
        <div className="flex h-screen bg-sky-100">
            <aside className="w-80 border-r dark:border-zinc-700">
            </aside>
            <section className="flex flex-col w-full relative">
                <Header />
                <div className="flex w-full absolute bottom-0 justify-center items-center h-16 bg-sky-300">
                    {/* <Footer/> */}
                    {/* <div className="flex w-full justify-center items-center h-16 bg-sky-300 "> */}
                        {/* <div className="flex w-full items-center space-x-2"> */}
                        <div className="flex w-full items-center">
                            <Input type="query" placeholder="query" />
                            <Button type="submit">送信</Button>
                        </div>
                    {/* </div> */}
                </div>
            </section>
        </div>
    </>
}
