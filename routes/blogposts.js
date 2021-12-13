var express = require('express');
var router = express.Router();
var Blogpost = require('../models/blogpost');
var { body, validationResult } = require('express-validator');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET new post form */
router.get('/', function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else res.render('createPost', { user: req.user });
});

/* Create post */
router.post('/', [
  body('title').isString(),
  body('body').isString()
], function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('createPost', { user: req.user });
    } else {
      let newPost = new Blogpost({
        title: req.body.title,
        body: req.body.body,
        publish: req.body.publish
      });
      newPost.save(function (err) {
        if (err) console.error(err);
        res.redirect('/');
      });
    }
  }
});

router.get('/:id', function (req, res, next) {
  Blogpost.findById(req.params.id).exec(function (err, blogpost) {
    if (err) console.error(err);
    res.render('editPost', { blogpost: blogpost, user: req.user });
  })
})

/* Update post */
router.put('/:id', [
  body('title').isString(),
  body('body').isString()
], function(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.redirect('/blogposts/' + req.params.id, { user: req.user });
    } else {
      Blogpost.findByIdAndUpdate(req.params.id, { 
          title: req.body.title,
          body: req.body.body,
          publish: req.body.publish
        }, {}, function (err) {
        if (err) console.error(err);
        res.redirect('/');
      });
    }
  }
});

router.delete('/:id', function (req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    Blogpost.findByIdAndDelete(req.params.id).exec(function (err) {
      if (err) console.error(err);
      res.redirect('/');
    });
  }
})


router.post('/:id/comments', [
  body('email').isEmail(),
  body('commentBody').isString()
], function (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.redirect('/blogposts/' + req.params.id);
  } else {
    Blogpost.findById(req.params.id).exec(function (err, blogpost) {
      var newComments = blogpost.comments;
      newComments.push({ author: req.body.email, body: req.body.commentBody });
      blogpost.comments = newComments;
      blogpost.save(function (err) {
        if (err) console.error(err);
        res.redirect('/blogposts/' + req.params.id);
      })
    });
  }
})

module.exports = router;
