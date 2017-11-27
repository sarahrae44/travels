const express = require('express');
const app = express();
const mongoose = require('mongoose');
const contributorsController = require('./controllers/contributors.js');

app.use('/contributors', contributorsController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(3000, () => {
  console.log('listening...');
});

mongoose.connect('mongodb://localhost:27017/travels');

mongoose.connection.once('open', () => {
  console.log('connected to mongo');
})
