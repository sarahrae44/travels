const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contributors/index.ejs');
});

router.get('/new', (req, res) => {
  res.render('contributors/new.ejs');
});

module.exports = router;
