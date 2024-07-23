import express from "express"
import { handleDashboard, handleLogin } from "../controllers/jwtController.js"
import { auth } from "../middleware/authMiddleware.js"

const Router = express.Router()

Router.route("/dashboard").get(auth, handleDashboard)

Router.route("/login").post(handleLogin)

export default Router
