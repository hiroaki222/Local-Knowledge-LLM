'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ldapSignUp } from '@/lib/actions/ldap-signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function Login() {
  const [register, setRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const zForm = z
    .object({
      email: z.string().email('メールアドレスの形式が正しくありません'),
      emailConfirm: z.string().optional(),
      password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
      passwordConfirm: z.string().optional(),
    })
    .refine((data) => !register || data.email === data.emailConfirm, {
      message: 'メールアドレスが一致しません',
      path: ['emailConfirm'],
    })
    .refine((data) => !register || data.password === data.passwordConfirm, {
      message: 'パスワードが一致しません',
      path: ['passwordConfirm'],
    })

  const form = useForm<z.infer<typeof zForm>>({
    defaultValues: {
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(zForm),
  })

  return (
    <main className=" grid min-h-dvh place-content-center place-items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async ({ email, password }) => {
            if (register) {
              const uuid = await ldapSignUp(email, password)
              if (!uuid) {
                toast('アカウントの作成に失敗しました')
                return
              }

              const result = await signIn('ldap', { email, password, redirect: false })
              if (!result?.ok) {
                toast('アカウントの作成に失敗しました')
                return
              }

              toast('ログインに成功しました')
            }

            const result = await signIn('ldap', { email, password, redirect: false })
            if (!result?.ok) {
              form.setError('email', { message: '' })
              form.setError('password', { message: 'メールアドレスまたはパスワードが間違っています' })
            }

            toast('ログインに成功しました')
          })}
        >
          <Card className=" w-96">
            {/* <CardHeader /> */}
            <p className='m-5 text-xl font-bold'>アカウント作成 / ログイン</p>
            <CardContent className=" grid content-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <div className=" h-5">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {register && (
                <FormField
                  control={form.control}
                  name="emailConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレスの確認</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <div className=" h-5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <div className=" relative flex">
                        <Input type={showPassword ? 'text' : 'password'} {...field} />
                        <Button
                          className=" absolute right-1.5 flex-none bg-transparent hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          size="icon"
                          type="button"
                          variant="ghost"
                        >
                          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </Button>
                      </div>
                    </FormControl>
                    <div className=" h-5">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {register && (
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>パスワードの確認</FormLabel>
                      <FormControl>
                        <div className=" relative flex">
                          <Input type={showPasswordConfirm ? 'text' : 'password'} {...field} />
                          <Button
                            className=" absolute right-1.5 flex-none bg-transparent hover:bg-transparent"
                            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                            size="icon"
                            type="button"
                            variant="ghost"
                          >
                            {showPasswordConfirm ? <EyeIcon /> : <EyeOffIcon />}
                          </Button>
                        </div>
                      </FormControl>
                      <div className=" h-5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
            <CardFooter className=" grid grid-cols-2 gap-4">
              {register ? (
                <>
                  <Button type="submit" variant="default">
                    アカウント作成
                  </Button>
                  <Button
                    onClick={() => {
                      setRegister(false)
                    }}
                    type="button"
                    variant="secondary"
                  >
                    ログイン
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setRegister(true)
                    }}
                    type="button"
                    variant="secondary"
                  >
                    アカウント作成
                  </Button>
                  <Button type="submit" variant="default">
                    ログイン
                  </Button>
                </>
              )}
              <div></div>
            <Link className='text- text-right' href='/'>ホームへ戻る</Link>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  )
}
