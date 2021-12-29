const express = require('express');
const router = express.Router();
const Blogpost = require('../models/blogpost');
const passport = require('passport');
const jwt = require('jsonwebtoken');

/* GET admin login page */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* POST admin login */
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user : user
        });
    }
    req.login(user, {session: false}, (err) => {
      if (err) res.send(err); 
      jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, {expiresIn: 300}, function (err, token) {
        return res.cookie('jwt', token).redirect('/admin');
      });
    });
  })(req, res);
});

/* GET logout */
router.get('/logout', function(req, res, next) {
  return res.clearCookie('jwt').redirect('/admin/login');
});

/* GET admin index page */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.render('adminIndex');
});

/* GET all blog posts */
router.get('/blogposts', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  Blogpost.find().exec((err, blogposts) => {
    if (err) console.error(err);
    res.json(blogposts);
  });
});

/* GET create post page */
router.get('/createPost', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.render('createPost');
})

/* Get single blog post */
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.render('editPost');
})

module.exports = router;