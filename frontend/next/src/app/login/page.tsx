'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link' // この行を追加
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {useForm} from "react-hook-form"

export default function Login() {
  const router = useRouter()
  const {handleSubmit, register} = useForm<{username: string, password: string}>()
  return (
    <div>
      <form onSubmit={handleSubmit(async (data) => {
            const result = await signIn('ldap', {
              username: data.username,
              password: data.password,
              redirect: false,
            })

            if (!result ||result.error) {
              console.error('ログインエラー:', result?.error)
            } else {
              router.push('/chat')
            }
      })}>
        <input type="text" placeholder="ユーザーID"{...register("username", {required: true})} />
        <input
          type="password"
          placeholder="パスワード"
          {...register("password", {required: true})}
        />
        <button type="submit">ログイン</button>
      </form>
      <p>
        アカウントをお持ちでない方は <Link href="/register">こちら</Link> から登録してください。
      </p>
    </div>
  )
}
