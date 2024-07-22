import { connect } from "mongoose"
import { error, log } from "console"
import { Products } from "./model/storeModel.js"
import data from "./products.json" assert { "type": "json" }
import { exit } from "process"

try {
  await connect(process.env.MONGO_URI)
  await Products.deleteMany()
  await Products.create(data)
  log("Done")
  exit(1)
} catch (err) {
  error(err)
  exit(0)
}
