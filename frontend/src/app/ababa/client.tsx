'use client'

import { Button } from '@/components/ui/button'

import { revalidateAction } from './action'

export default function AbabaClient() {
  return <Button onClick={() => revalidateAction()}>revalidate</Button>
}
