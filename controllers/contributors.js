const express = require('express');
const router = express.Router();
const Contributor = require('../models/contributors.js');
const Post = require('../models/posts.js');

router.get('/', (req, res) => {
  Contributor.find({}, (err, foundContributors) => {
    res.render('contributors/index.ejs', {
      contributors: foundContributors
    });
  });
});

router.post('/', (req, res) => {
  Contributor.create(req.body, (err, createdContributor) => {
    res.redirect('/contributors');
  })
});

router.get('/new', (req, res) => {
  res.render('contributors/new.ejs')
});

router.get('/:id', (req, res) => {
  Contributor.findById(req.params.id, (err, foundContributor) => {
    res.render('contributors/show.ejs', {
      contributor: foundContributor
    });
  });
});

router.delete('/:id', (req, res) => {
  Contributor.findByIdAndRemove(req.params.id, (err, foundContributor) => {
    const postIds = [];
    for(let i = 0; i < foundContributor.posts.length; i++) {
      postIds.push(foundContributor.posts[i]._id);
    }
    Post.remove(
      {
        _id: {
          $in: postIds
        }
      },
      (err, data) => {
        res.redirect('/contributors');
      }
    );
  });
});

router.get('/:id/edit', (req, res) => {
  Contributor.findById(req.params.id, (err, foundContributor) => {
    res.render('contributors/edit.ejs', {
      contributor: foundContributor
    });
  });
});

router.put('/:id', (req, res) => {
  Contributor.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect('/contributors');
  });
});

module.exports = router;
