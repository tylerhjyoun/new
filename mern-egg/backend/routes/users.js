const router = require('express').Router();
let User = require('../models/user.model');
let Group = require('../models/group.model')
require('dotenv').config()
const jwt = require('jsonwebtoken')


router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.delete('/:id', (req, res) => {
  User.findByIdAndDelete()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const followers = req.body.followers;
  const following = req.body.following
  
  const newUser = new User({ name, username, password, followers, following });
  console.log(newUser)
  newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/addfollowing/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $push: { following: req.body.id } })
    .then(res.json('Added to Following'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/addfollower/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $push: { followers: req.body.id } })
    .then(res.json('Follower Added'))
    .catch(err => res.status(400).json('Error: ' + err));
})


router.post('/unfollow/:id', (req, res) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.params.id, { $pull: { following: req.body.id } })
    .then(res.json('Unfollowed'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/removefollower/:id', (req, res) => {
  console.log(req.body)

  User.findByIdAndUpdate(req.params.id, { $pull: { followers : req.body.id } })
    .then(res.json('Follower Removed'))
    .catch(err => res.status(400).json('Error: ' + err));
})


function authorizeUser(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })

}



module.exports = router;
