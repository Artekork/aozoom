// product-controller.js
const Cluster = require('../models/model.product');

const handleError = (res, error) => {
  res.status(500).json({ error });
};

const getProducts = (req, res) => {
  const filter = req.query; // { isNewProduct: 'true', isHitProduct: 'false' }

  Cluster
    .find() // Ищем все кластеры
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
const getMovie = (req, res) => {
  Movie
  .findById(req.params.id)
  .then((movie) => {
    res
      .status(200)
      .json(movie);
  })
  .catch((err) => handleError(res, err));
};

//

//
const getProduct = (req, res) => {
  const productId = req.params.id;


  Cluster.findOne({ "products.id": productId })
    .then(cluster => {
      if (cluster) {

        // Ищем товар с указанным ID внутри найденного кластера
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











module.exports = {
  getProducts,
  getProduct,
};