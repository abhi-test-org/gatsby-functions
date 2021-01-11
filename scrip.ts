import * as path from "path"

const func = require(path.join(__dirname, ".cache/functions/dog.js"))

func.default({ req: {}, res: {} }).then(data => {
  console.log(data)
})
