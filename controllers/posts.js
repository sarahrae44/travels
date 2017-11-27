const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');

router.get('/', (req, res) => {
  Post.find({}, (err, foundPosts) => {
    res.render('posts/index.ejs', {
      posts: foundPosts
    });
  })
});

router.get('/new', (req, res) => {
  res.render('posts/new.ejs');
});

router.post('/', (req, res) => {
  Post.create(req.body, (err, createdPost) => {
    res.redirect('/posts');
  });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    res.render('posts/show.ejs', {
      post: foundPost
    });
  });
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, () => {
    res.redirect('/posts');
  });
});

router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    res.render('posts/edit.ejs', {
      post: foundPost
    });
  });
});

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect('/posts');
  });
});

module.exports = router;
