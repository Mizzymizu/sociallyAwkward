const { Schema, model } = require('mongoose');

// Thought Schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        // Must be between 1 and 280 characters
        min_length: 1,
        max_length: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: createdAt => dateformat(createdAt)
    },
    username: [{
        type: Schema.Types.ObjectId, ref: 'users',
        required: true,
    }],
    reactions: [{
        type: Schema.Types.ObjectId, ref: 'reactions'
    }]
});

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        // Min of 1 character, max of 280 characters
        min_length: 1,
        max_length: 280
    },
    username: [{
        type: Schema.Types.ObjectId, ref: 'users',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: reactedAt => dateformat(reactedAt)
    }
});

// Virtual to get total number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thoughts = model('thoughts', thoughtSchema);
const Reactions = model('reactions', reactionSchema);

module.exports = { Thoughts, Reactions };