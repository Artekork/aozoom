//product-routes.js
const express = require('express');
const router = express.Router();
const { getProducts, getProduct} = require('../controllers/product-controller')


router.get('/getProducts', getProducts);
router.get('/getProduct/:id', getProduct);

module.exports = router;