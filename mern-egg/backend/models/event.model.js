const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventname: { type: String, required: true },
    description: { type: String, required: true },
    starttime: { type: String, required: true },
    endtime: { type: String, required: true },

        }, {
    timestamps: true,
  });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event; // allows 'Event' to be used as model


