'use client'

import { isPendingAtom } from '@/lib/utils/atom'
import { useAtomValue } from 'jotai'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function Chat() {
  const [state, setState] = useState<number>(0)
  const isPending = useAtomValue(isPendingAtom)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [state, isPending])

  return (
    <>
      {(() => {
        const divs = []
        for (let i = 0; i < state; i++) {
          divs.push(
            <div key={i} className="h-16 bg-city">
              {i}
            </div>,
          )
        }
        return divs
      })()}
      <div ref={ref} className="bg-city">
        <button onClick={() => setState(state + 1)}>ababa</button>
      </div>
      {isPending && (
        <div className="bg-black">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </>
  )
}
