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
      .catch(e => {
        console.error(e)
      })

    fetch(`/functions/dog.js`, {
      method: "POST",
    })
      .then(res => res.json())
      .then(data => {
        setDog(data)
      })
      .catch(e => {
        console.error(e)
      })

    return () => {}
  }, [])

  console.log(dog, "#####")

  return (
    <div>
      <h1>The time right now is {time}</h1>
      {dog && <img src={dog?.message} />}

      <p>Heres a form</p>

      <input
        name="first_name"
        value={formSubmit.firstName}
        onChange={e => {
          setFormSubmit({
            ...formSubmit,
            firstName: e.target.value,
          })
        }}
      />

      <button
        onClick={e => {
          fetch(`/functions/submit.js`, {
            method: "POST",
            body: JSON.stringify(formSubmit),
          })
            .then(res => res.json())
            .then(({ data }) => {
              setFormResponse(data)
            })
        }}
        type="button"
      >
        Submit
      </button>

      {JSON.stringify(formResponse)}
    </div>
  )
}
