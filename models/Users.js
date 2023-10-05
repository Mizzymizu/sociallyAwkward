const { Schema, Model } = require('mongoose');

// User Schema
const userSchema = new Schema();

const Users = model('users', userSchema);

module.exports = Users;