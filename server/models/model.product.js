//model.product.js
const { strict } = require('assert');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Схема для деталей продукта
const productDetailsSchema = new Schema({
  smallDesc: [String],
  allDesc: [{ className: String, inner: String }],
  details: [[String]]
});

// Схема для продукта
const productSchema = new Schema({
  id: {type: String, required: true },
  isHitProduct: { type: Boolean, required: true },
  isNewProduct: { type: Boolean, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  selled: { type: Number, required: true },
  imagesUrl: [String],
  details: productDetailsSchema
});

// Схема для кластера
const clusterSchema = new Schema({
  clusterName: { type: String, required: true },
  products: [productSchema]
});

// Модель для кластера
const Cluster = mongoose.model('Cluster', clusterSchema);

module.exports = Cluster;
