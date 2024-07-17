import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Chatlayout() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  const fetchAPI = async (message) => {
    try {
      const response = await fetch(`/api/DqhSF91M_Eyl1rWXIrJI7gtFnjB67TSMJV2nf9-ZuNVHNDg?prompt=${encodeURIComponent(message)}`);
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching API:", error);
      return 'error';
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage = { type: "user", text: inputValue };
    setMessages([...messages, userMessage]);

    const apiResponse = await fetchAPI(inputValue);
    const botMessage = { type: "bot", text: apiResponse };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInputValue("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div key="1" className="flex h-screen bg-white dark:bg-zinc-800">
      <aside className="w-80 border-r dark:border-zinc-700">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Messages</h2>
            <Button size="icon" variant="ghost">
              <PencilIcon className="w-6 h-6" />
            </Button>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <Input className="pl-8" placeholder="Search messages..." type="search" />
            <Button className="absolute right-2.5 top-3" size="icon" variant="ghost" />
          </div>
          <div className="space-y-2">
            <Card className="p-2">
              <CardContent>
                <h3 className="font-semibold">Contact Name</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Last message...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>
      <section className="flex flex-col w-full">
        <header className="border-b dark:border-zinc-700 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <div>
                KashiharaGPT
              </div>
            </h2>
            <Avatar className="relative overflow-visible w-10 h-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4" ref={chatContainerRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-end gap-2 ${message.type === "bot" ? "justify-start" : "justify-end"}`}>
                <div className={`rounded-lg ${message.type === "bot" ? "bg-zinc-200 dark:bg-zinc-700" : "bg-blue-500 text-white"} p-2`}>
                  <p className="text-base">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer className="border-t dark:border-zinc-700 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input className="flex-1 h-12" placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <Button className="h-12 px-6 text-lg" type="submit">Send</Button>
          </form>
        </footer>
      </section>
    </div>
  )
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
