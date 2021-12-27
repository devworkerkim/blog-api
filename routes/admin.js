var express = require('express');
var router = express.Router();
var Blogpost = require('../models/blogpost');
var passport = require('passport');
var bcrypt= require('bcrypt');

/* GET admin login page */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* POST admin login */
router.post('/login', passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/admin/login"
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

/* GET admin index page */
router.get('/', function(req, res, next) {
  res.render('adminIndex');
});

/* GET all blog posts */
router.get('/blogposts', function(req, res, next) {
  Blogpost.find().exec((err, blogposts) => {
    if (err) console.error(err);
    res.json(blogposts);
  });
});

/* GET create post page */
router.get('/createPost', function(req, res, next) {
  res.render('createPost');
})

/* Get single blog post */
router.get('/:id', function(req, res, next) {
  res.render('editPost');
})

module.exports = router;