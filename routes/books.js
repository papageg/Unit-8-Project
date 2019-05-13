var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

// router.get('/', (req, res, next) => {
//     res.send('Welcome Home');
//   });

  router.get('/', function(req, res, next) {
    // Book.findAll().then(function(books){
      res.render("index", {Books: books, title: "Welcome Home!" });
    // })
    // .catch(function(err) {
    //   res.sendStatus(500);
    // });  
  });

  router.get('/books', (req, res, next) => {
    res.send('Create a New Book');
  });

  router.get('/books/new', (req, res, next) => {
    res.send('New Book Form');
  });

  router.post('/books/new', (req, res, next) => {
    Book.create(req.body).then(function(book) {
      res.redirect("/book/" + book.id);
    });
  });

  router.get('/books/:id', (req, res, next) => {
    res.send('Book Detail Form');
  });

//   router.post('/books/:id', (req, res, next) => {
//     res.send('Update book info in database');
//   });

//   router.post('/books/:id'/delete (req, res, next) => {
//     res.send('Deleted Book');
//   });

module.exports = router;


// get / - Home route should redirect to the /books route.
// get /books - Shows the full list of books.
// get /books/new - Shows the create new book form.
// post /books/new - Posts a new book to the database.
// get /books/:id - Shows book detail form.
// post /books/:id - Updates book info in the database.
// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.