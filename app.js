var express = require('express');
var path = require('path');
var sequelize = require('sequelize');


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

//   routes.get('/books', (req, res, next) => {
//     res.send('Create a New Book');
//   });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

//   sequelize.sync({force: true}).then(() => {
      app.listen(port)
    // });

module.exports = app;







