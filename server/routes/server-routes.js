//server-routes.js
const express = require('express');
const router = express.Router();
const { getProducts, getProduct, getProductsFiltered} = require('../controllers/product-controller')
const { registerUser, login, getUserInfo, logout, updateInfo} = require('../controllers/account-controller')

module.exports = router;

router.get('/getProducts', getProducts);
router.get('/getProductsFiltered', getProductsFiltered);
router.get('/getProduct/:id', getProduct);




router.post('/registerUser', registerUser);
router.post('/login', login);
router.get('/getUserInfo', getUserInfo);
router.post('/logout', logout);
router.put('/updateInfo', updateInfo);


module.exports = router;