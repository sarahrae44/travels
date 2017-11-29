const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/login', (req, res, next) => {
  res.render('users/login.ejs')
});

router.get('/register', (req, res, next) => {
  res.render('users/register.ejs', {})
});

router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
          req.session.message = '';
          req.session.username = req.body.username;
          req.session.logged = true;
          console.log(req.session, req.body);            res.redirect('/contributors')
        } else {
          console.log('else in bcrypt compare')
          req.session.message = 'Username or password are incorrect';
          res.redirect('/sessions/login')
        }
      } else {
        req.session.message = 'Username or password are incorrect';
        res.redirect('/sessions/login')
      }
  });
})

router.post('/register', (req, res, next) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash
  User.create(userDbEntry, (err, user) => {
    console.log(user)
    req.session.username = user.username;
    req.session.logged = true;
    res.redirect('/contributors')
  });
})

router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  })
})


// router.get('/new', (req, res) => {
//   res.render('sessions/new.ejs');
// });
//
// router.post('/', (req, res) => {
//   User.findOne({ username: req.body.username }, (err, foundUser) => {
//     if(bcrypt.compareSync(req.body.password, foundUser.password)){
//       req.session.currentuser = foundUser;
//       res.redirect('/');
//     } else {
//       res.send('wrong password');
//     }
//   });
// });
//
// router.delete('/', (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/');
//   });
// });

module.exports = router;
