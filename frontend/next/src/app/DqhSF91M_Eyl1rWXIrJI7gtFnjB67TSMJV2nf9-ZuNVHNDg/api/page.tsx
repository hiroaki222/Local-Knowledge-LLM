export default async function Test() {
  let result = 'N/A'
  try {
    const response = await fetch('http://backend:8000').then((data) => data.text())
    result = await response
  } catch (error) {
    result = 'error'
  }
  return (
    <>
      <p className="text-2xl">result : {result}</p>
    </>
  )
}
