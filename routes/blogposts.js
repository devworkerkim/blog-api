var express = require('express');
var router = express.Router();
var Blogpost = require('../models/blogpost');
var { body, validationResult } = require('express-validator');

/* GET all published blog posts. */
router.get('/', function(req, res, next) {
  Blogpost.find({ publish: true }).exec((err, blogposts) => {
    if (err) console.error(err);
    res.json(blogposts);
  });
});

/* GET single blog post */
router.get('/:postid', function(req, res, next) {
  Blogpost.findById(req.params.postid).exec((err, blogpost) => {
    if (err) console.error(err);
    res.json(blogpost);
  });
});

/* POST single blog post */
router.post('/', [body('title').isString(), body('body').isString()], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({error: errors});
  } else {  
    let newPost = new Blogpost({
      title: req.body.title,
      body: req.body.body,
      publish: req.body.publish
    });
    newPost.save(function (err) {
      if (err) console.error(err);
      res.json(newPost);
    });
  }
});

/* PUT single blog post */
router.put('/:id', [body('title').isString(),body('body').isString()], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({error: errors});
  } else {
    Blogpost.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        body: req.body.body,
        publish: req.body.publish
      }, {}, function (err, blogpost) {
      if (err) console.error(err);
      res.json(blogpost);
    });
  }
});

/* DELETE single blog post */
router.delete('/:id', function (req, res, next) {
  Blogpost.findByIdAndDelete(req.params.id).exec(function (err, blogpost) {
    if (err) console.error(err);
    res.json(blogpost);
  });
});

/* POST single comment in blog post */
router.post('/:id/comments', [body('email').isEmail(),body('commentBody').isString()], function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({error: errors});
  } else {
    Blogpost.findById(req.params.id).exec(function (err, blogpost) {
      var newComments = blogpost.comments;
      newComments.push({ author: req.body.email, body: req.body.commentBody });
      blogpost.comments = newComments;
      blogpost.save(function (err, newblogpost) {
        if (err) console.error(err);
        if (req.body.publicform) {
          res.redirect('../../publicposts/' + req.params.id);
        } else res.json(newblogpost);
      })
    });
  }
});

/* PUT single comment in blog post */
router.put('/:id/comments/:commentid', [body('email').isEmail(),body('commentBody').isString()], function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({error: errors});
  } else {
    Blogpost.findById(req.params.id).exec(function (err, blogpost) {
      var editCommentInd = blogpost.comments.findIndex((comment) => comment._id.toString() === req.params.commentid);
      var editedComments = blogpost.comments;
      editedComments[editCommentInd] = { author: req.body.email, body: req.body.commentBody };
      blogpost.comments = editedComments;
      blogpost.save(function (err, newblogpost) {
        if (err) console.error(err);
        res.json(newblogpost);
      });
    });
  }
});

/* DELETE single comment in blog post */
router.delete('/:id/comments/:commentid', function (req, res, next) {
  Blogpost.findById(req.params.id).exec(function (err, blogpost) {
    var deleteCommentInd = blogpost.comments.findIndex((comment) => comment._id.toString() === req.params.commentid);
    var editedComments = blogpost.comments;
    editedComments.splice(deleteCommentInd, 1);
    blogpost.comments = editedComments;
    blogpost.save(function (err, newblogpost) {
      if (err) console.error(err);
      res.json(newblogpost);
    });
  });
});

module.exports = router;