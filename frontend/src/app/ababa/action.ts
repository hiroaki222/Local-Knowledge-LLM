'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateAction() {
  revalidateTag('ababa')
}
