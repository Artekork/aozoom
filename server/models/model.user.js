//model.product.js
const { strict } = require('assert');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderProductSchema = new Schema({
  count: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
});
const userInfoSchema = new Schema({
  name: { type: String, required: false },
  surname: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  location: { type: String, required: false }
});

const orderSchema = new Schema({
  date: { type: String, required: true },
  userinfo: userInfoSchema,
  products: { type: Map, of: orderProductSchema },
  totalPrice: { type: Number, required: true }
});

const userSchema = new Schema({
  userInfo: userInfoSchema,
  email: { type: String, required: false },
  password: { type: String, required: false },
  photo: { type: String, required: false },
  cart: { type: Map, of: Number },
  favorites: [String],
  history: { type: Map, of: orderSchema }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
