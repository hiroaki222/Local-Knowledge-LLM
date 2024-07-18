'use client'
import Header from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"

export default function Page() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [messages, setMessages] = useState<{ author: string; content: string; }[]>([]);

    async function fetchAPI(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const userMessage = { author: 'user', content: prompt };
        setMessages([...messages, userMessage]);
        console.log(messages)

        try {
            const data = await (await fetch(`/api/DqhSF91M_Eyl1rWXIrJI7gtFnjB67TSMJV2nf9-ZuNVHNDg?prompt=${encodeURIComponent(prompt)}`)).json();
            const botMessage = { author: 'bot', content: data.response };
            setMessages(prevMessages => [...prevMessages, botMessage]);
            setResult(data.response);
        } catch (error) {
            const botMessage = { author: 'bot', content: 'error' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
            setResult('error');
        }
        setPrompt('');
    }

    return <>
        <div className="flex h-screen bg-sky-50">
            <aside className="w-80 border-r dark:border-zinc-700 bg-sky-100">
                <header className="flex justify-center items-center h-16 bg-sky-300">
                    <p className="text-xl text-white font-bold font-sans">履歴</p>
                </header>
            </aside>
            <div className="flex flex-col w-full relative">
                <div className="row-start-1">
                <Header/> 
                </div>
               
                <section className="flex flex-1 w-full relative overflow-y-auto mb-16 row-start-2">

                    <div className="flex-1 p-4 space-y-2 ">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className=
                                {
                                    `flex 
                                ${message.author === 'user'
                                        ? 'justify-end'
                                        : 'justify-start'}`
                                }
                            >
                                <div className="bg-sky-200 p-2 rounded-md inline-block">
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
                <form onSubmit={fetchAPI} className="w-full absolute bottom-0">
                    <div className="flex w-full">
                        <footer className="flex w-full justify-center items-center h-16 bg-sky-300 row-start-3
                        ">
                            <div className="flex w-full items-center space-x-2 ml-1 mr-1">
                                <Input type="text" name="prompt" placeholder="prompt" className="border" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                                <Button type="submit">送信</Button>
                            </div>
                        </footer>
                    </div>
                </form>
            </div>

        </div>
    </>
}
