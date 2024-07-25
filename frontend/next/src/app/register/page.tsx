'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Register() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password }),
    })
    if (response.ok) {
      router.push('/login')
    } else {
      console.error('登録エラー')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="ユーザーID" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
      <button type="submit">アカウント登録</button>
    </form>
  )
}
