const { Schema, model } = require('mongoose');

// User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // Mongoose email validation
      validate: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Email validation has failed, my friend.'
      ]
    },
    thoughts: [{
        type: Schema.Types.ObjectId, ref: 'thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId, ref: 'users'
    }]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

// Virtual to get total friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('users', userSchema);

module.exports = Users;
