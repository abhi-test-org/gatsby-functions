const accountSid = "ACffa3c93fe2e5e901ea30b420f68cf7d6"
const authToken = "c859e5045995b177afcbc8bf61642a6c"
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
