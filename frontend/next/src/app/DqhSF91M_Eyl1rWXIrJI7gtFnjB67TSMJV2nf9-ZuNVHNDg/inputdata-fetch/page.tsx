"use client"

import { useState } from "react";

export default function Test() {
  const [prompt, setPrompt] = useState("N/A")
  const [result, setResult] = useState("N/A");

  async function fetchAPI(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    try {
      const data = await (await fetch(`/api/DqhSF91M_Eyl1rWXIrJI7gtFnjB67TSMJV2nf9-ZuNVHNDg?prompt=${encodeURIComponent(prompt)}`)).json()
      setResult(data.response)
    } catch (error) {
      setResult('error')
    }
  }
  return (
    <>
      <form onSubmit={fetchAPI}>
          <input type="prompt" name="prompt" placeholder="prompt" className="border" onChange={(e) => setPrompt(e.target.value)}/>
          <button type="submit">submit</button>
      </form>
      <p className='text-2xl'>response : {result}</p>
    </>
  );
}