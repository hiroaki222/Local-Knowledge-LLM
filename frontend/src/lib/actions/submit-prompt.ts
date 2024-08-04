'use server'

import { revalidateTag } from "next/cache"

export async function SubmitPrompt() {
  revalidateTag('chatLog')
}