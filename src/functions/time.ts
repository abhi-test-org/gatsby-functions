module.exports = (req, res) => {
  console.log("Yo this is a log")
  res.status(200).send({
    data: Date.now(),
  })
}
