import express from "express"
const Route = express.Router()

Route.route("/").get((req, res) => {
  res.send("Home Page")
})

export default Route
