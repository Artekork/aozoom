//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const Product = require('./models/model.product');  
const productsRoutes = require('./routes/server-routes');  
const cookieParser = require("cookie-parser")

const connectUrl = "mongodb+srv://lampasUser:Artekoko.123@lampas.durta.mongodb.net/lampas";
const PORT = 3000;

const app = express();

// Настройте CORS
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200', '127.0.0.1:3000']
}
)); 

app.use(express.json());
app.use(productsRoutes);
app.use(cookieParser())


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