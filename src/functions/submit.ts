const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)

export default async (req, res) => {
  const body = req.body

  const message = await client.messages.create({
    body: body.message,
    from: "+16513582594",
    to: body.to,
  })

  res.status(200).send({
    data: {
      ...message,
      success: true,
    },
  })
}
