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
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setDog(data)
      })
      .catch(e => {
        console.error(e)
      })

    return () => {}
  }, [])

  return (
    <div>
      <h1>The time right now is {time}</h1>
      {dog && <img src={dog?.message} />}

      <p>Heres a form</p>

      <input
        name="Phone"
        value={formSubmit.phone}
        onChange={e => {
          setFormSubmit({
            ...formSubmit,
            phone: e.target.value,
          })
        }}
      />

      <textarea
        name="message"
        value={formSubmit.message}
        onChange={e => {
          setFormSubmit({
            ...formSubmit,
            message: e.target.value,
          })
        }}
      />

      <button
        onClick={e => {
          fetch(`/functions/submit.js`, {
            method: "POST",
            body: JSON.stringify({
              to: formSubmit.phone,
              body: formSubmit.message,
            }),
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
