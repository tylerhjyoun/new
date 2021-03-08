const router = require('express').Router();
let User = require('../models/user.model');
let Group = require('../models/group.model');

require('dotenv').config()
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    console.log(req.user)
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.post('/', (req, res) =>{
    User.find({username: req.body.username})
        .then((user) =>{
            if(req.body.password == user[0].password){
                const id = {id: user[0]._id}
                const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET)
                res.json({ accessToken: accessToken })
            } else {
                res.json({ accessToken: "Incorrect Combination"})
            }
        })
        .catch(()=>res.json({ accessToken: "Cannot find user" }))
 })

 router.post('/token', (req, res) =>{
    const token = req.body.token.split(' ');
    const decoded = jwt.verify(token[0], process.env.ACCESS_TOKEN_SECRET)
    res.json({id: decoded})
 })


 

module.exports = router;
