const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Импортируйте cors
const Product = require('./models/model.product');  // Убедитесь, что путь правильный
const productsRoutes = require('./routes/product-routes');  // Убедитесь, что путь правильный

const connectUrl = "mongodb+srv://lampasUser:Artekoko.123@lampas.durta.mongodb.net/lampas";
const PORT = 3000;

const app = express();

// Настройте CORS
app.use(cors());  // Разрешите все домены

// Или укажите только ваш фронтенд домен
// app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());
app.use(productsRoutes);

mongoose
  .connect(connectUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo"))
  .catch((err) => console.log(`db connection error: ${err}`));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});