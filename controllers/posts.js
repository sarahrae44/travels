const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');
const Contributor = require('../models/contributors.js')

router.get('/', (req, res) => {
  Post.find({}, (err, foundPosts) => {
    res.render('posts/index.ejs', {
      posts: foundPosts
    });
  })
});

router.get('/new', (req, res) => {
  Contributor.find({}, (err, allContributors) => {
    res.render('posts/new.ejs', {
      contributors: allContributors
    });
  });
});

router.post('/', (req, res) => {
  Contributor.findById(req.body.contributorId, (err, foundContributor) => {
    Post.create(req.body, (err, createdPost) => {
      foundContributor.posts.push(createdPost);
      foundContributor.save((err, data) => {
        res.redirect('/posts');
      });
    });
  });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    Contributor.findOne({'posts._id':req.params.id}, (err, foundContributor) => {
      res.render('posts/show.ejs', {
        contributor: foundContributor,
        post: foundPost
      });
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
