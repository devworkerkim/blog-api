const express = require('express');
const router = express.Router();
const Blogpost = require('../models/blogpost');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

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
router.post('/', passport.authenticate('jwt', {session: false}), [body('title').isString(), body('body').isString()], function(req, res, next) {
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
      if (req.body.userform) res.redirect('../admin');
      else res.json(newPost);
    });
  }
});

/* PUT single blog post */
router.put('/:id', passport.authenticate('jwt', {session: false}), [body('title').isString(),body('body').isString()], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({error: errors});
  } else {
    Blogpost.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'}, function (err, blogpost) {
      if (err) console.error(err);
      if (req.body.userform) res.redirect('../admin');
      else res.json(blogpost);
    });
  }
});

/* DELETE single blog post */
router.delete('/:id', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  Blogpost.findByIdAndDelete(req.params.id, function (err, blogpost) {
    if (err) console.error(err);
    if (req.body.userform) res.redirect('../admin');
    else res.json(blogpost);
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
        if (req.body.userform) res.redirect('../../publicposts/' + req.params.id);
        else res.json(newblogpost);
      })
    });
  }
});

/* PUT single comment in blog post */
router.put('/:id/comments/:commentid', passport.authenticate('jwt', {session: false}), [body('email').isEmail(),body('commentBody').isString()], function (req, res, next) {
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
        if (req.body.userform) res.redirect('../../../admin/' + req.params.id);
        else res.json(newblogpost);
      });
    });
  }
});

/* DELETE single comment in blog post */
router.delete('/:id/comments/:commentid', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  Blogpost.findById(req.params.id).exec(function (err, blogpost) {
    var deleteCommentInd = blogpost.comments.findIndex((comment) => comment._id.toString() === req.params.commentid);
    var editedComments = blogpost.comments;
    editedComments.splice(deleteCommentInd, 1);
    blogpost.comments = editedComments;
    blogpost.save(function (err, newblogpost) {
      if (err) console.error(err);
      if (req.body.userform) res.redirect('../../../admin/' + req.params.id);
      else res.json(newblogpost);
    });
  });
});

module.exports = router;