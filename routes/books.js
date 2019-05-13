var express = require('express');
var app = express.Router();
var Book = require("../models").Book;

app.get('/', (req, res, next) => {
    res.send('Welcome Home');
  });

  app.get('/books', (req, res, next) => {
    res.send('Create a New Book');
  });

  app.get('/books/new', (req, res, next) => {
    res.send('New Book Form');
  });

  app.post('/books/new', (req, res, next) => {
    Book.create(req.body).then(function(book) {
      res.redirect("/book/" + book.id);
    });
  });

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


// get / - Home route should redirect to the /books route.
// get /books - Shows the full list of books.
// get /books/new - Shows the create new book form.
// post /books/new - Posts a new book to the database.
// get /books/:id - Shows book detail form.
// post /books/:id - Updates book info in the database.
// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.