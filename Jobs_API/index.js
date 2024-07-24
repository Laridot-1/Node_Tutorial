import { error, log } from "console"
import express from "express"
import "express-async-errors"
import { connect } from "mongoose"
import { AuthRoute } from "./routes/auth.js"
import { JobRoute } from "./routes/job.js"
import { custom404, errorHandler } from "./middlewares/errorHandler.js"

const app = express()

// Body Parser
app.use(express.json())

// Routes
app.use("/api/v1/auth", AuthRoute)
app.use("/api/v1/jobs", JobRoute)

// Error handlers
app.use(custom404)
app.use(errorHandler)

try {
  const PORT = process.env.PORT
  await connect(process.env.MONGO_URI)
  app.listen(PORT, () => log(`Server listening on ${PORT}`))
} catch (err) {
  error(err.message)
}
