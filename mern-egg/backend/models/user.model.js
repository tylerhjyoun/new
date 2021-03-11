// begin model for user
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true},
    followers: {type: Array},
    following: {type: Array},
    profilepicture: {type: Number}
}, {
    timestamps: true,
  });

const User = mongoose.model('User', userSchema);

module.exports = User; // allows 'User' to be used as model

 