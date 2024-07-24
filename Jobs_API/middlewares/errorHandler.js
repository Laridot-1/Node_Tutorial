import { BaseError } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"

const custom404 = (req, res, _) => {
  res.status(StatusCodes.NOT_FOUND).json({
    msg: `Route: ${req.protocol}://${req.hostname}:5000${req.url} does not exist`,
  })
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    res.status(err.status).json({ msg: err.message })
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
  }
}

export { custom404, errorHandler }
