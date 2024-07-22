import { getProducts } from "../model/storeModel.js"

const handleGetProducts = async (req, res) => {
  let { company, name, featured, numericFilter, sort, field } = req.query
  const query = {}

  // Filter fuctionality
  if (company) query.company = company

  if (name) query.name = { $regex: name, $options: "i" }

  if (featured) {
    featured = featured === "true" ? true : false
    query.featured = featured
  }

  if (numericFilter) {
    const signs = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    }
    let ref = numericFilter.replace(
      /\b(<|<=|>|>=|=)\b/g,
      (m) => `-${signs[m]}-`
    )
    const opts = ["price", "rating"]
    ref = ref.split(",").forEach((i) => {
      const [field, operator, value] = i.split("-")
      if (opts.includes(field)) {
        query[field] = { [operator]: Number(value) }
      }
    })
  }

  // Sort functionality
  let sortList = sort ? sort.split(",").join(" ") : "createdAt"

  // Return certain fields
  let selectList = field ? field.split(",").join(" ") : ""

  // Pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const products = await getProducts(query, sortList, selectList, skip, limit)

  res.status(200).json({ products })
}

export { handleGetProducts }
