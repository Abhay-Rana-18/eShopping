const connectToMongo = require('./db');
const express = require("express");
var cors = require('cors');

connectToMongo();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


app.use('/eShopping/auth', require('./Routes/auth'));
app.use('/eShopping/products', require('./Routes/product_route'));
app.use('/eShopping/atc', require('./Routes/atcRoute'));


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}/`);
});