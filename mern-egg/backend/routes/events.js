const router = require('express').Router();
let Event = require('../models/event.model');


router.route('/').get((req, res) => {
    Event.find()
      .then(events => res.json(events))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/find/:id').get((req, res) => {
    Event.find({"user.id": req.params.id})
      .then(events => res.json(events))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    console.log(req.body)
    const eventname = req.body.eventname;
    const description= req.body.description;
    const starttime = req.body.starttime;
    const endtime = req.body.endtime;
    const user = req.body.user
    
    const newEvent = new Event({eventname, description, starttime, endtime, user});

    newEvent.save()
        .then(() => res.json('Event added'))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted'))
        .catch(err => res.status(400).json('Error: ' + err));   
})

module.exports = router;
