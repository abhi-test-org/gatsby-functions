const accountSid = process.env.GATSBY_TWILIO_ACCOUNT_SID
const authToken = process.env.GATSBY_TWILIO_AUTH_TOKEN

const client = require("twilio")(accountSid, authToken)

module.exports = async (req, res) => {
  const body = req.body

  console.log(`BODY`, body)

  if (!body) {
    res.sendStatus(500)
    return
  }

  const message = await client.messages.create({
    body: body.message,
    from: "+16513582594",
    to: `+19094564319`,
  })

  res.status(200).send({
    data: {
      ...message,
      success: true,
    },
  })
}
