import jwt from "jsonwebtoken"
import { CustomError } from "../errors/jwtErrors.js"

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError(400, "No token provided", 401)
  }

  const token = authHeader.split(" ")[1]

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)

    req.username = data.username
    req.id = data.id
    next()
  } catch (err) {
    throw new CustomError("Not authorized", 401)
  }
}
