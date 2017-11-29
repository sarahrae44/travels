const express = require('express');
const app = express();
const mongoose = require('mongoose');
const assert = require('assert');
const query = require('query');
const session = require('express-session');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const contributorsController = require('./controllers/contributors.js');
app.use('/contributors', contributorsController);

const postsController = require('./controllers/posts.js');
app.use('/posts', postsController);

// const usersController = require('./controllers/users.js');
// app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
  res.render('index.ejs',
//   {
//     currentUser: req.session.currentuser
//   }
);
});

// app.get('/app', (req, res) => {
//   if(req.session.currentuser){
//     res.send('the party');
//   } else {
//     res.redirect('/sessions/new');
//   }
// });

app.use(session({
  secret: "randomsessionstring",
  resave: false,
  saveUnitialized: false
}));

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
