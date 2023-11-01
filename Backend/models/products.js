const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: Number,
  },
  images: {
    type: Array,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  atc: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
  }
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
