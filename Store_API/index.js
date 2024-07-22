import { log } from "console"
import express from "express"
import "express-async-errors"
import { custom404, errorHandler } from "./errors/storeErrors.js"
import StoreRoute from "./route/storeRoute.js"
import { connect } from "mongoose"

const PORT = process.env.PORT || 3000

const app = express()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Route
app.use("/api/v1/products", StoreRoute)

// Error Handler
app.use(custom404)
app.use(errorHandler)

try {
  await connect(process.env.MONGO_URI)
  app.listen(PORT, () => log(`Server listening on port ${PORT}`))
} catch (err) {
  log(err)
}
