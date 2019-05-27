var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Book = require("../models").Book;

  router.use(bodyParser());

  router.get('/', function(req, res, next) {
    Book.findAll().then(function(books){
      res.render("index", {books: books, title: "Books" });
    })
    .catch(function(err) {
      res.sendStatus(500);
    });  
  });

  router.get('/new', function(req, res, next) {
    Book.findByPk(req.params.id).then(function(book) {
      res.render("new-book", {book: book, title: "New Book"});
    });
  });


  router.post('/new', (req, res, next) => {
    Book.create(req.body).then(function(book) {
      res.redirect('/books/' + book.id);
    }).catch(function(err) {
      if(err.name === "SequelizeValidationError") { 
        res.render("new-book", {
          book: Book.build(req.body), //adds already entered info
          title: "New Book",
          errors: err.errors //errors array in err, gets added in new --> error view. Before empty so not there
        });
      } else {
        throw err; //handled by the final catch
      }
    }).catch(function(err) {
      res.render("error", { error: err });
      console.log(err);
    }) 
  });


  router.get('/:id', (req, res, next) => {
    Book.findByPk(req.params.id).then(function(book) {
      res.render("../views/update-book", {book:book.id, title: book.title, author: book.author, genre:book.genre, year: book.year});
    })
  });
    

  router.put('/:id', (req, res, next) => {
    Book.findByPk(req.params.id).then(function(book) {
      return book.update(req.body);
    }).then(function(book){
      res.redirect("/books/" + book.id);
    });
  });

  // router.post('/books/:id/delete', (req, res, next) => {
  //   res.send('Deleted Book');
  // });

module.exports = router;


// get / - Home route should redirect to the /books route.
// get /books - Shows the full list of books.
// get /books/new - Shows the create new book form.
// post /books/new - Posts a new book to the database.
// get /books/:id - Shows book detail form.
// post /books/:id - Updates book info in the database.
// post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting.