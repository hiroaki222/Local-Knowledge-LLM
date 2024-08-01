import AbabaClient from './client'

export default async function Ababa() {
  const res = await fetch('http://localhost:3000/api/ababa', { next: { tags: ['ababa'] } })
  const { value } = await res.json()

  return (
    <main className=" grid min-h-dvh place-content-center place-items-center gap-4">
      {value}
      <AbabaClient />
    </main>
  )
}
