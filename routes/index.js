var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send("../public/index.html");
  res.send("Welcome to express");
});

module.exports = router;
