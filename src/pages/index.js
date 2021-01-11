import React, { useState, useEffect } from "react"

export default function Home() {
  const [time, setTime] = useState(``)
  const [dog, setDog] = useState(``)
  const [formSubmit, setFormSubmit] = useState({})
  const [formResponse, setFormResponse] = useState({})

  useEffect(() => {
    fetch(`/functions/time.js`, {
      method: "POST",
    })
      .then(res => res.json())
      .then(({ data }) => {
        setTime(new Date(data).toLocaleTimeString("en-US"))
      })

    fetch(`/functions/dog.js`, {
      method: "POST",
    })
      .then(res => res.json())
      .then(({ data: dogData }) => {
        setDog(dogData)
      })

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <h1>The time right now is {time}</h1>
      <img src={dog?.messagee} />

      <p>Heres a form</p>

      <form
        onSubmit={e => {
          e.preventDefault()

          fetch(`/functions/submit.js`, {
            method: "POST",
          })
            .then(res => res.json())
            .then(({ data }) => {
              setFormResponse(data)
            })
        }}
      >
        <input
          name="first_name"
          onChange={e => {
            setFormSubmit({
              ...formSubmit,
              firstName: e.target.value,
            })
          }}
        />
      </form>

      {JSON.stringify(formResponse)}
    </div>
  )
}
