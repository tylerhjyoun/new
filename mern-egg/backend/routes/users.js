const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const usertimer = req.body.usertimer;

    const newUser = new User({name, username, usertimer});

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
