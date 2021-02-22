// begin model for group
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: { type: String },
    groupMembers: {type: Array}, // array of names of group members
    groupCount: {type: Number},
  });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group; // allows 'Group' to be used as model

 