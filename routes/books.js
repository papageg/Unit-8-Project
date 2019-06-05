var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Book = require("../models").Book;

  router.use(bodyParser());
//Above is setting up express bodyparser book and router to be used within book.js file

//Below Router.get here will generate the index.pug file and display the books when the web search is at the / address
  router.get('/', function(req, res, next) {
    Book.findAll().then(function(books){
      res.render("index", {books: books, title: "Books" });
    })
    .catch(function(err) {
      res.sendStatus(500);
    });  
  });

//Below router.get /new will show the new-book.pug page when /new web adress is reached and display the book creation page
  router.get('/new', function(req, res, next) {
    Book.findByPk(req.params.id).then(function(book) {
      res.render("new-book", {book: Book, title: "New Book"});
    });
  });

//Below router.post /new will create the new book if it gets an error then it will render the newbook page again or throw an error code
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

//Below router.get /:id will generate when you are at a specific book page and give the choice to update the text feilds or throw errors
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
  
//Below Router.post /:id will update the books information to the database or throw the appropriate error
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
          book: req.params.id,
          title: reqbody.title,
          author: reqbody.author,
          genre: reqbody.genre,
          year: reqbody.year,
          errors: errors
        });
      }
    })
  });

 //Below router.post /:id/delete will delete the book permanantly 
  router.post('/:id/delete', (req, res, next) => {
    Book.findByPk(req.params.id).then(function(book) {
      return book.destroy();
    }).then(function(book){
      res.redirect("/books");
    });
  });

module.exports = router;