const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongo = require('./config/db');
const session = require('express-session');

mongo.connect();

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
  
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
