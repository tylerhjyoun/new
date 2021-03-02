const router = require('express').Router();
let User = require('./models/user.model');
let Group = require('./models/group.model');

require('dotenv').config()
const jwt = require('jsonwebtoken')

router.get('/', authorizeUser, (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.post('/', (req, res) =>{
    User.find({username: req.body.username})
        .then((user) =>{
            if(req.body.password == user[0].password){
                const user = {username: req.body.username}
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                res.json({ accessToken: accessToken })
            } else {
                res.json('Incorrect Combination')
            }
        })
        .catch(()=>res.json("Cannot find user"))
 })


function authorizeUser(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=> {
      if(err) return res.sendStatus(403)
      req.user = user
      next()
    })
}
 

module.exports = router;
