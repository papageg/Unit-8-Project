var express = require('express');
var app = express.Router();

app.get('/', (req, res, next) => {
    res.send('Welcome Home');
  });

  app.get('/books', (req, res, next) => {
    res.send('Create a New Book');
  });

  app.get('/books/new', (req, res, next) => {
    res.send('New Book Form');
  });

//   app.post('/books/new', (req, res, next) => {
//     res.send('Post Book to database');
//   });

  app.get('/books/:id', (req, res, next) => {
    res.send('Book Detail Form');
  });

//   app.post('/books/:id', (req, res, next) => {
//     res.send('Update book info in database');
//   });

//   app.post('/books/:id'/delete (req, res, next) => {
//     res.send('Deleted Book');
//   });

module.exports = app;