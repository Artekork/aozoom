// product-controller.js
const { setTimeout } = require('timers/promises');
const Cluster = require('../models/model.product');
const { default: cluster } = require('cluster');
const { find } = require('rxjs');

const handleError = (res, error) => {
  res.status(500).json({ error });
};

const getProducts = (req, res) => {
  const filter = req.query; // { isNewProduct: 'true', isHitProduct: 'false' }

    Cluster
    .find() 
    .then((clusters) => {

      let products = [];

      // Преобразуем значения фильтра к правильным типам
      const parsedFilter = {};
      for (let key in filter) {
        if (filter[key] === 'true') {
          parsedFilter[key] = true;
        } else if (filter[key] === 'false') {
          parsedFilter[key] = false;
        } else {
          parsedFilter[key] = Number(filter[key]) || filter[key];
        }
      }

      clusters.forEach(cluster => {
        const clusterProducts = Array.from(cluster.products.values());
        
        // Применяем составной фильтр к продуктам
        const filteredProducts = clusterProducts.filter(product => {
          return Object.keys(parsedFilter).every(key => {
            return product[key] === parsedFilter[key];
          });
        });

        products.push(...filteredProducts);
      });
      
        res.status(200).json(products);
      })
    .catch((err) => handleError(res, err));
};

const getProduct = (req, res) => {
  const productId = req.params.id;


  Cluster.findOne({ "products.id": productId })
    .then(cluster => {
      if (cluster) {

        const product = cluster.products.find(p => p.id === productId);

        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } else {
        res.status(404).json({ error: 'Cluster not found' });
      }
    })
    .catch(err => {
      console.error(`Ошибка при выполнении запроса: ${err.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

const getProductsFiltered = (req, res) => {
  let findWord = req.query.findWord;

  let products = [];

    Cluster
    .find() 
    .then((clusters) => {
      
      clusters.forEach(cluster => {
        cluster.products.forEach(product => {
          if (product.name.toLowerCase().includes(findWord.toLowerCase())){
            products.push(product)
          }
        });
      });

      
      
        res.status(200).json(products);
      })
    .catch((err) => handleError(res, err));
};


module.exports = {
  getProducts,
  getProductsFiltered,
  getProduct,
};