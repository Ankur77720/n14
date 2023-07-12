var express = require('express');
var router = express.Router();
var users = require('./users')
var passport = require('passport')
var localStrategy = require('passport-local')
passport.use(new localStrategy(users.authenticate()))
const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0/n1-finalProject').then(result => {
  console.log("Connected to database")
}).catch(err => {
  console.log(err)
})

async function clearSockets() {
  var allUser = await users.find({})
  await Promise.all(
    allUser.map(async user => {
      user.currentSocket = ''
      await user.save()
    })
  )
}
clearSockets()

/* GET home page. */
router.get('/', isloggedIn, async function (req, res, next) {
  var currentUser = await users.findOne({
    username: req.user.username
  })

  res.render('index', { user: currentUser });
});

router.post('/register', (req, res, next) => {
  var newUser = {
    //user data here
    username: req.body.username,
    pic: req.body.pic,
    //user data here
  };
  users
    .register(newUser, req.body.password)
    .then((result) => {
      passport.authenticate('local')(req, res, () => {
        //destination after user register
        res.redirect('/');
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  (req, res, next) => { }
);

router.get('/login', (req, res, next) => {
  res.render('login')
})

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect('/login');
}
router.post('/findUser', async (req, res, next) => {
  var findUser = await users.findOne({
    username: req.body.data
  })
  if (findUser) {
    res.status(200).json({
      isUserThere: true,
      user: findUser,
    })
  }
  else {
    res.status(200).json({
      isUserThere: false,
    })
  }
})

module.exports = router;
