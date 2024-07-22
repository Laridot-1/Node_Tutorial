import express from "express"
import { handleGetProducts } from "../controllers/storeControllers.js"
const Route = express.Router()

Route.route("/").get(handleGetProducts)

export default Route
