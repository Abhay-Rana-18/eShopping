const mongoose = require("mongoose");
const { Schema } = mongoose;

const atcSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
  imgUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    
  },
  amount: {
    type: Number,
    default: 1,
  },
  discountPercentage: {
    type: Number,
  }, 
  rating: {
    type: Number,
  },
  brand: {
    type: String,
  },
  
});

const AddToCart = mongoose.model("cart", atcSchema);
module.exports = AddToCart;
