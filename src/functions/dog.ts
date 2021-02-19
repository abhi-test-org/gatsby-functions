const nodeFetch = require("node-fetch")

module.exports = async (req, res) => {
  const dogImage = await nodeFetch("https://dog.ceo/api/breeds/image/random")
  const dogJson = await dogImage.json()
  res.status(200).send(dogJson)
}
