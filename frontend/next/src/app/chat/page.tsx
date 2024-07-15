'use client'
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const ChatForm = () =>{
    
}


export default function Page() {
    return <>
        <div className="flex h-screen bg-sky-50">
            <aside className="w-80 border-r dark:border-zinc-700 bg-sky-100">
                <header className="flex justify-center items-center h-16 bg-sky-300">
                    <p className="text-xl text-white font-bold font-sans">履歴</p>
                </header>
            </aside>
            <section className="flex flex-col w-full relative">
                <Header />
                <div className="flex w-full absolute bottom-0">
                    <Footer />
                </div>
            </section>
        </div>
    </>
}
