'use client'
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"




export default function Page() {
    const [prompt, setPrompt] = useState('N/A')
    const [result, setResult] = useState('N/A')

    async function fetchAPI(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const data = await (await fetch(`/api/DqhSF91M_Eyl1rWXIrJI7gtFnjB67TSMJV2nf9-ZuNVHNDg?prompt=${encodeURIComponent(prompt)}`)).json()
            setResult(data.response)
        } catch (error) {
            setResult('error')
        }
    }
    return <>
        <div className="flex h-screen bg-sky-50">
            <aside className="w-80 border-r dark:border-zinc-700 bg-sky-100">
                <header className="flex justify-center items-center h-16 bg-sky-300">
                    <p className="text-xl text-white font-bold font-sans">履歴</p>
                </header>
            </aside>
            <section className="flex flex-col w-full relative">
                <Header />
                <div className="text">{result}</div>
                <form onSubmit={fetchAPI}>
                    <div className="flex w-full absolute bottom-0">
                        <footer className="flex w-full justify-center items-center h-16 bg-sky-300 ">
                            <div className="flex w-full items-center spave-x-2 ml-1 mr-1">
                                <Input type="prompt" name="prompt" placeholder="prompt" className="border" onChange={(e) => setPrompt(e.target.value)} />
                                <Button type="submit">送信</Button>
                            </div>
                        </footer>
                    </div>
                </form>

            </section>
        </div>
    </>
}
