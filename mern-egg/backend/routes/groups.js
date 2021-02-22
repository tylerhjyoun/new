const router = require('express').Router();
let Group = require('../models/group.model');

router.route('/').get((req, res) => {
    Group.find()
      .then(group => res.json(group))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const groupName = req.body.groupName;
    const groupMembers = req.body.groupMembers;
    const groupCount = req.body.groupCount;

    const newGroup = new Group({groupName, groupMembers , groupCount});

    newGroup.save()
        .then(() => res.json('Group added'))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/:id').delete((req, res) => {
    Group.findByIdAndDelete(req.params.id)
        .then(() => res.json('Group deleted'))
        .catch(err => res.status(400).json('Error: ' + err));   
})

router.route('/:id').post((req, res) => {
    Group.findById(req.params.id)
        .then(group => res.json(group))
        .catch(err => res.status(400).json('Error: ' + err));   
})


module.exports = router;