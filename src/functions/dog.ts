export default async (req, res) => {
  const dogImage = await fetch("https://dog.ceo/api/breeds/image/random")
  const dogJson = await dogImage.json()
  res.status(200).send(dogJson)
}
