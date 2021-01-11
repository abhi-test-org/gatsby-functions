export default (req, res) => {
  const body = req.body

  res.status(200).send({
    data: {
      ...body,
      success: true,
    },
  })
}
