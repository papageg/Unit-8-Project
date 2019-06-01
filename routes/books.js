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
      res.render("new-book", {book: Book, title: "New Book"});
    });
  });


  router.post('/new', (req, res, next) => {
    Book.create(req.body).then(function(book) {
      res.redirect('/books/');
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
      //.id, title: book.title, author: book.author, genre:book.genre, year: book.year
    }).catch(function(err) {
      if(err.name === "SequelizeValidationError") { 
        res.render("../views/new-book", {
          book: Book.build(req.body), //adds already entered info
          title: "New Book",
          errors: err.errors //errors array in err, gets added in new --> error view. Before empty so not there
        });
      } else {
        throw err; //handled by the final catch
      }
    }).catch(function(err) {
      res.render("errors", { errors: err });
      console.log(err);
    }) 
  });
  
  
  router.post('/:id', (req, res, next) => {
    const reqbody = req.body;
    Book.findByPk(req.params.id).then(function(book) {
      return book.update(req.body);
    }).then(function(book){
      res.redirect("/books");
     }).catch(function(err) {
      if(err.name === "SequelizeValidationError") { 
        const errors = err.errors.map(error => error.message);
        res.render("../views/update-book", {
          reqbody,
          title: reqbody.title,
          author: reqbody.author,
          genre: reqbody.genre,
          year: reqbody.year,
          errors
        });
      } else {
        next(err);
      }
    })
  });

  router.post('/:id/delete', (req, res, next) => {
    Book.findByPk(req.params.id).then(function(book) {
      return book.destroy();
    }).then(function(book){
      res.redirect("/books");
    });
  });

module.exports = router;