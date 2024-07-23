import { log } from "console"
import express from "express"
import "express-async-errors"
import dotenv from "dotenv"
import Router from "./route/jwtRoute.js"
import { custom404, errorHandler } from "./errors/jwtErrors.js"

dotenv.config()
const app = express()

// Middleware
app.use(express.static("./public"))

// Body Parser
app.use(express.json())

// Routes
app.use("/api/v1", Router)

// Error Handlers
app.use(custom404)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => log(`Server listening on port ${PORT}`))
