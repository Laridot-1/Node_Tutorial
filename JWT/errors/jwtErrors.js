class CustomError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

const custom404 = (req, res, next) => {
  res.status(404).json({
    msg: `Route: ${req.protocol}://${req.hostname}${req.port}${req.url} not found`,
  })
}

const errorHandler = (err, req, res, next) => {
  err instanceof CustomError
    ? res.status(err.status).json({ msg: err.message })
    : res.status(500).json({ msg: "Something went wrong" })
}

export { CustomError, custom404, errorHandler }
