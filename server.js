const express = require('express');
const app = express();
const mongoose = require('mongoose');
const assert = require('assert');
const query = require('query');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const contributorsController = require('./controllers/contributors.js');
app.use('/contributors', contributorsController);

const postsController = require('./controllers/posts.js');
app.use('/posts', postsController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController)

app.get('/', (req, res) => {
  res.render('index.ejs');
});

mongoose.connect('mongodb://localhost:27017/travels', {
  useMongoClient: true
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);

app.listen(3000, () => {
  console.log('listening...');
});
