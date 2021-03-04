const router = require('express').Router();
let User = require('../models/user.model');
let Group = require('../models/group.model')
require('dotenv').config()
const jwt = require('jsonwebtoken')


router.get('/', authorizeUser, (req, res) => {
  console.log(req.user)
  User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({name, username, password});

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

function authorizeUser(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=> {
    console.log(err)
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })

}



module.exports = router;
