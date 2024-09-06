//product-routes.js
const express = require('express');
const router = express.Router();
const { getProducts, getProduct, getProductsFiltered} = require('../controllers/product-controller')


router.get('/getProducts', getProducts);
router.get('/getProductsFiltered', getProductsFiltered);
router.get('/getProduct/:id', getProduct);

module.exports = router;