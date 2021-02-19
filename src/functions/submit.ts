const accountSid = process.env.GATSBY_TWILIO_ACCOUNT_SID
const authToken = process.env.GATSBY_TWILIO_AUTH_TOKEN

const client = require("twilio")(accountSid, authToken)

export default async (req, res) => {
  const body = req.body

  console.log(body)

  const message = await client.messages.create({
    body: body.message,
    from: "+16513582594",
    to: `+1${body.to}`,
  })

  res.status(200).send({
    data: {
      ...message,
      success: true,
    },
  })
}
