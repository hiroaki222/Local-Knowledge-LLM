import { z } from 'zod'

const zVar = z.string().min(1)
const zEnv = z.object({
  MONGO_URL: zVar,
})

const result = zEnv.safeParse(process.env)
if (!result.success) {
  throw `env type is invalid\n${result.error.errors.map((v) => `${v.message}: env.${v.path[0]}`).join('\n')}`
}

declare module 'bun' {
  interface Env extends z.infer<typeof zEnv> {}
}
