'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link' // この行を追加
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('ldap', {
      username: userId,
      password,
      redirect: false,
    })
    if (result.error) {
      console.error('ログインエラー:', result.error)
    } else {
      router.push('/chat')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="ユーザーID" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
        <button type="submit">ログイン</button>
      </form>
      <p>
        アカウントをお持ちでない方は <Link href="/register">こちら</Link> から登録してください。
      </p>
    </div>
  )
}
