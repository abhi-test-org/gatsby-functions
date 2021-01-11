module.exports = async (req, res) => {
  const fetch = require("node-fetch")
  const dogImage = await fetch("https://dog.ceo/api/breeds/image/random")
  const dogJson = await dogImage.json()
  res.status(200).send(dogJson)
}
