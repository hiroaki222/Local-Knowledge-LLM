'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ldapSignUp } from '@/lib/actions/ldap-signup'
import { signIn } from 'next-auth/react'
import { useForm } from "react-hook-form";

export default function Register() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<{username: string, password: string}>();
  
  return (
    <form onSubmit={handleSubmit(async(data) => {
      await ldapSignUp(data.username, data.password)
      const ok = await signIn('ldap', {
        username: data.username,
        password : data.password,
        redirect: false,
      })

      if (!ok) return

      router.push("/chat")
    }
    )}>
      <input type="text" placeholder="ユーザーID" {...register("username", {required: true})} />
      <input type="password" placeholder="パスワード" {...register("password", {required: true})} />
      <button type="submit">アカウント登録</button>
    </form>
  )
}
