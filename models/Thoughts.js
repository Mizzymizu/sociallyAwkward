const { Schema, Model } = require('monggoose');

// Thought Schema
const thoughtSchema = new Schema();

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;