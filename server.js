var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();

// setup handlebars view engine
app.engine('handlebars',
  handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./shoppingOrder_Routes/index');
app.use('/', routes);

app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.listen(3000, function () {
  console.log('http://localhost:3000');
});

