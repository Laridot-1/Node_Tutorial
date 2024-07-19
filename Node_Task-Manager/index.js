import { log } from "console"
import express from "express"
import TaskRoutes from "./routes/route.js"
import { connect } from "mongoose"
import { custom404, errorHandler } from "./middleware/taskMiddleware.js"

const PORT = process.env.PORT || 8000

const app = express()

// Static assets
app.use(express.static("./public"))

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/v1/tasks", TaskRoutes)

// Error handlers
app.use(custom404)
app.use(errorHandler)

try {
  await connect(process.env.MONGO_URI)
  app.listen(PORT, () => log(`Server listening on port ${PORT}`))
} catch (err) {
  log(err)
}
