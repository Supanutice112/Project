const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'Homepage', 'Homepage3.html'));
});

app.get('/Homepage/Homepage3.html', function (req, res) {
    res.sendFile(__dirname + '/Homepage/Homepage3.html');
  });
  
  app.get('/Login/login.html', function (req, res) {
    res.sendFile(__dirname + '/Login/login.html');
  });
  app.get('/Location/Location.html', function (req, res) {
    res.sendFile(__dirname + '/Location/Location.html');
  });
  
  app.get('/Shipping/shipping.html', function (req, res) {
    res.sendFile(__dirname + '/Shipping/shipping.html');
  });

  app.get('/special.html', function (req, res) {
    res.sendFile(__dirname + '/special.html');
  });
  
  app.get('/Snack.html', function (req, res) {
    res.sendFile(__dirname + '/Snack.html');
  });
  app.get('/Sushi.html', function (req, res) {
    res.sendFile(__dirname + '/Sushi.html');
  });
  app.get('/Drink.html', function (req, res) {
    res.sendFile(__dirname + '/Drink.html');
  });

  app.get('/views/restaurant', (req, res) => {
    res.render('restaurant')
  })
  app.get('/views/customer', (req, res) => {
    res.render('customer')
  })

  app.post('/add-to-cart', (req, res) => {
  
    if (!req.session.cart) {
      req.session.cart = [];
    }
  
    req.session.cart.push({
      product: req.body.product,
      price: req.body.price
    });
  
    res.redirect('/shipping');
  });
  
  app.get('/shipping', (req, res) => {
    let cart = req.session.cart || [];
    let totalPrice = 0;
  
    cart.forEach(function(item) {
      totalPrice += parseInt(item.price);
    });
  
    res.render(__dirname + '/Shipping/shipping.html', {
      cart: cart,
      totalPrice: totalPrice
    });
  });

  app.post('/customer', (req, res) => {
    const { name, email, address ,totalPrice} = req.body;
  
    res.render('customer', { name, email, address ,totalPrice});
  });
  app.get('/views/customer1', (req, res) => {
    res.render('customer1')
  })
  
  app.get('/views/customer2', (req, res) => {
    res.render('customer2')
  })
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

