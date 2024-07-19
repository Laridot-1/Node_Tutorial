const asyncWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next)
  } catch (err) {
    err.status = 400
    next(err)
  }
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({ msg: err.message })
}

const custom404 = (req, res) => {
  res
    .status(404)
    .send(`Route: ${req.protocol}://${req.hostname}${req.url} not found`)
}

export { asyncWrapper, errorHandler, custom404 }
