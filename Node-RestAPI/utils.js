const { writeFile } = require("fs")

const writeToFile = (data) => {
  writeFile("./people.json", JSON.stringify(data), (err) => {
    if (err) throw err.code
  })
}

const getReqBody = (req) => {
  return new Promise((resolve) => {
    let body = ""
    req.on("data", (chunk) => {
      body += chunk
    })
    req.on("end", () => {
      body = JSON.parse(body)
      resolve(body)
    })
  })
}

module.exports = {
  writeToFile,
  getReqBody,
}
