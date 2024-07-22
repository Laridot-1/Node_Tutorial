import { model, Schema } from "mongoose"

const productsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.3,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
})

const Products = model("Product", productsSchema)

const getProducts = (query, sortList, selectList, skip, limit) => {
  return new Promise((resolve) => {
    const products = Products.find(query)
      .sort(sortList)
      .select(selectList)
      .skip(skip)
      .limit(limit)
    resolve(products)
  })
}

export { Products, getProducts }
