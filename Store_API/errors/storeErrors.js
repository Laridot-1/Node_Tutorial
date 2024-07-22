const custom404 = (req, res) => {
  res
    .status(404)
    .send(`Route: ${req.protocol}://${req.hostname}${req.url} not found.`)
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 400).json({ msg: err.message })
}

export { custom404, errorHandler }
