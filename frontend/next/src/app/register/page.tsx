'use client'
import { ldapSignUp } from '@/lib/actions/ldap-signup'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function Register() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<{ username: string; password: string }>()

  return (
    <div className="grid min-h-dvh place-content-center place-items-center gap-4 p-4">
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">ユーザー登録</h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">ユーザーIDとパスワードを入力してください</p>
      <form
        onSubmit={handleSubmit(async (data) => {
          await ldapSignUp(data.username, data.password)
          const ok = await signIn('ldap', {
            username: data.username,
            password: data.password,
            redirect: false,
          })

          if (!ok) return

          router.push('/chat')
        })}
      >
        <div className="space-y-5">
          <div>
            <input
              type="text"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 w-full rounded-md border-2 p-2 focus:ring-2 sm:w-96 md:w-[30rem] lg:w-[40rem]"
              placeholder="ユーザーID"
              {...register('username', { required: true })}
            />
          </div>
          <div>
            <input
              type="password"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 w-full rounded-md border-2 p-2 focus:ring-2 sm:w-96 md:w-[30rem] lg:w-[40rem]"
              placeholder="パスワード"
              {...register('password', { required: true })}
            />
          </div>

          <div className="w-full space-y-4">
            <button
              type="submit"
              className="bg-black text-white hover:bg-gray-800 h-10 w-full rounded-md px-6 font-semibold transition duration-300 ease-in-out"
            >
              アカウント登録
            </button>
          </div>

          <div>
            <Link
              className="bg-black text-white hover:bg-gray-800 flex h-10 w-full items-center justify-center rounded-md px-6 font-semibold transition duration-300 ease-in-out"
              href="/login"
            >
              ログイン画面に戻る
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
