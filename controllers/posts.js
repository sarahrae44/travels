const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');
const Contributor = require('../models/contributors.js')

router.get('/', (req, res) => {
  if(req.session.logged){
    Post.find({}, (err, foundPosts) => {
      res.render('posts/index.ejs', {
        posts: foundPosts
      });
    })
  } else {
    res.redirect('/sessions/login')
  }
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
  Post.findByIdAndRemove(req.params.id, (err, foundPost) => {
    Contributor.findOne({'posts._id':req.params.id}, (err, foundContributor) => {
      foundContributor.posts.id(req,params.id).remove();
      foundContributor.save((err, data) => {
        res.redirect('/posts');
      });
    });
  });
});

router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    Contributor.find({}, (err, allContributors) => {
      Contributor.findOne({'posts._id': req.params.id}, (err, foundPostContributor) => {
        res.render('posts/edit.ejs', {
          post: foundPost,
          contributors: allContributors,
          postContributor: foundPostContributor
        });
      });
    });
  });
});

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
    Contributor.findOne({'posts._id': req.params.id }, (err, foundContributor) => {
      if(foundContributor._id.toString() !== req.body.contributorId) {
        foundContributor.posts.id(req.params.id).remove();
        foundContributor.save((err, savedFoundContributor) => {
          Contributor.findById(req.body.contributorId, (err, newContributor) => {
            newContributor.posts.push(updatedPost);
            newContributor.save((err, savedNewContributor) => {
              res.redirect('/posts/'+req.params.id);
            });
          });
        });
      } else {
        foundContributor.posts.id(req.params.id).remove();
        foundContributor.posts.push(updatedPost);
        foundContributor.save((err, data) => {
          res.redirect('/posts/'+req.params.id);
        });
      }
    });
  });
});

module.exports = router;
