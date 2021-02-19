import React, { useState, useEffect } from "react"
import { Box, Heading, Text, Textarea, Input, Button } from "@chakra-ui/react"

export default function Home() {
  const [time, setTime] = useState(``)
  const [dog, setDog] = useState(``)
  const [formSubmit, setFormSubmit] = useState({})
  const [formResponse, setFormResponse] = useState({})

  useEffect(() => {
    fetch(
      process.env.NODE_ENV === `production`
        ? `/functions/time.js`
        : `/functions/time`,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(({ data }) => {
        setTime(new Date(data).toLocaleTimeString("en-US"))
      })
      .catch(e => {
        console.error(e)
      })

    fetch(
      process.env.NODE_ENV === `production`
        ? `/functions/dog.js`
        : `/functions/dog`,
      {
        method: "GET",
      }
    )
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
    <Box maxW="640px" m="24px auto">
      <Heading textAlign="center" mb="16px">
        {" "}
        Welcome to Gatsby Functions
      </Heading>

      <Box mb="16px">
        <Heading as="h2" fontSize="20px" mb="8px">
          A simple request
        </Heading>
        <Text>The time right now is {time}</Text>
      </Box>
      <Box mb="16px">
        <Heading as="h2" fontSize="20px" mb="16px">
          A Dog
        </Heading>

        <Box maxW="320px" m="0 auto">
          {dog && <img src={dog?.message} />}
        </Box>
      </Box>

      <Box mb="16px">
        <Heading as="h2" fontSize="20px" mb="16px">
          Twilio Form
        </Heading>

        <Input
          type="tel"
          name="Phone"
          placeholder="Phone Number"
          value={formSubmit.phone}
          onChange={e => {
            setFormSubmit({
              ...formSubmit,
              phone: e.target.value,
            })
          }}
        />
        <br />
        <br />
        <Textarea
          name="message"
          placeholder="Message"
          value={formSubmit.message}
          onChange={e => {
            setFormSubmit({
              ...formSubmit,
              message: e.target.value,
            })
          }}
        />

        <Button
          textAlign="right"
          onClick={e => {
            fetch(
              process.env.NODE_ENV === `production`
                ? `/functions/submit.js`
                : `/functions/submit`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: formSubmit.phone,
                  message: formSubmit.message,
                }),
              }
            )
              .then(res => res.json())
              .then(({ data }) => {
                setFormSubmit({})
                setFormResponse(data)
              })
          }}
          type="button"
        >
          Submit
        </Button>
      </Box>

      <br />
      <br />

      {JSON.stringify(formResponse)}
    </Box>
  )
}
