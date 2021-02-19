const nodeFetch = require("node-fetch")

module.exports = async (req, res) => {
  const dogImage = await nodeFetch.default(
    "https://dog.ceo/api/breeds/image/random"
  )

  console.log(dogImage)

  const dogJson = await dogImage.json()

  console.log(dogJson)
  res.status(200).send(dogJson)
}
