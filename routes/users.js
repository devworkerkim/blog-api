var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var { body, validationResult } = require('express-validator');
var bcrypt= require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('addUser', { user: req.user });
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


/* GET users listing. */
router.post('/', [
  body('email').isEmail().trim().normalizeEmail(),
  body('password').isString(),
  ], function(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.redirect('/');
  }
  else {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) console.error(err);
      var newUser = new User({
        email: req.body.email,
        password: hashedPassword
      });
      newUser.save(function(err) {
        if (err) console.error(err);
        res.redirect('/');
      });
    });
  }
});

module.exports = router;
