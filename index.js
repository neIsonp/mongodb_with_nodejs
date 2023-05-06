const express = require('express');
const { engine } = require('express-handlebars');
const conn = require('./db/conn');

const app = express();

//routes
const productsRoutes = require('./routes/produtsRoutes');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/products', productsRoutes);

app.listen(3000);