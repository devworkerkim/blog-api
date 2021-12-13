var express = require('express');
var router = express.Router();
var Blogpost = require('../models/blogpost');

/* GET home page. */
router.get('/', function(req, res, next) {
  Blogpost.find().exec(function (err, blogposts) {
    res.render('index', { blogposts: blogposts, user: req.user });
  })
});

module.exports = router;
