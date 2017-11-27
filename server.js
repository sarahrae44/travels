const express = require('express');
const app = express();
const contributorsController = require('./controllers/contributors.js');

app.use('/contributors', contributorsController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(3000, () => {
  console.log('listening...');
});
