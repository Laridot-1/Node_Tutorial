const { log } = require("console")

const logger = (req, res, next) => {
  log(req.method, req.url)
  next(req, res)
}

const errorHandler = (err, req, res) => {
  res.writeHead(err.status, { "Content-Type": "application/json" })
  res.end(
    JSON.stringify({
      msg: err.message,
    })
  )
}

module.exports = {
  logger,
  errorHandler,
}
