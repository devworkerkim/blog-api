const express = require('express');
const router = express.Router();
const Blogpost = require('../models/blogpost');

/* GET single post page. */
router.get('/:id', function(req, res, next) {
    Blogpost.findById(req.params.id).exec(function (err, blogpost) {
        res.render('singlepost');
    })
});

module.exports = router;