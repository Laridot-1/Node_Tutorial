import { randomBytes } from "crypto"
import jwt from "jsonwebtoken"
import { CustomError } from "../errors/jwtErrors.js"

const handleDashboard = (req, res) => {
  res
    .status(200)
    .json({ msg: `Hello ${req.username}`, secret: `ID: ${req.id}` })
}

const handleLogin = async (req, res) => {
  const { username, password } = req.body

  if (!username?.trim() || !password?.trim()) {
    throw new CustomError(400, "Please fill all fields")
  }

  const token = jwt.sign(
    {
      username,
      id: randomBytes(5).toString("hex"),
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  )

  res.status(201).json({ msg: "User created", token })
}

export { handleDashboard, handleLogin }
