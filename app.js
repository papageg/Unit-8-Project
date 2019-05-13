var express = require('express');
var app = express();

var routes = require('./routes/books');
var app = express();

app.use('/', routes);


app.listen(3000);







