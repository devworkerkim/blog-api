var express = require('express');
var router = express.Router();
var Blogpost = require('../models/blogpost');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
