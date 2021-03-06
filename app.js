var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var {sequelize} = require('./models');


var books = require('./routes/books');
var routes = require('./routes/index');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/books', books);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  sequelize.sync().then(() => {
      app.listen(port)
    });

module.exports = app;







