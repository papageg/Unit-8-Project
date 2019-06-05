var express = require('express');
var router = express.Router();

/* GET home page. */
//If the main page is loaded it will redirect to the /books form
router.get('/', function(req, res, next) {
  res.redirect("/books")
});

module.exports = router;