import React, { useState, useEffect } from "react"

export default function Home() {
  const [time, setTime] = useState(``)
  const [dog, setDog] = useState(``)

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await fetch(`/functions/time.js`).then(res => res.json())
      setTime(new Date(data).toLocaleTimeString("en-US"))
    }, 1000)

    const { data: dogData } = await fetch(`/functions/dog.js`).then(res => res.json())

    setDog(dogData)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <h1>The time right now is {time}</h1>
      <img src={dog?.messagee} />
    </div>
  )
}
