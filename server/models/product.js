const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  isHitProduct: { type: Boolean, required: true },
  isNewProduct: { type: Boolean, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  selled: { type: Number, required: true },
  name: { type: String, required: true },
  mainImageUrl: { type: String, required: true },
}) // сложные объекты в записях можно вынести в отдельные схемы

const Product = mongoose.model('Product', productSchema)

module.exports = Product;