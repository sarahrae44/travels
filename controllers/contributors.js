const express = require('express');
const router = express.Router();
const Contributor = require('../models/contributors.js');

router.get('/', (req, res) => {
  Contributor.find({}, (err, foundContributors) => {
    res.render('contributors/index.ejs', {
      contributors: foundContributors
    });
  })
});

router.get('/new', (req, res) => {
  res.render('contributors/new.ejs');
});

router.post('/', (req, res) => {
  Contributor.create(req.body, (err, createdContributor) => {
    res.redirect('/contributors');
  });
});

router.get('/:id', (req, res) => {
  Contributor.findById(req.params.id, (err, foundContributor) => {
    res.render('contributors/show.ejs', {
      contributor: foundContributor
    });
  });
});

router.delete('/:id', (req, res) => {
  Contributor.findByIdAndRemove(req.params.id, () => {
    res.redirect('/contributors');
  });
});

module.exports = router;
