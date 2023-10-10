const { Schema, Model } = require("mongoose");
const thoughtSchema = require("./Thoughts");

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
      validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation has failed, my friend.'
      }
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
    },
  }
);

// Virtual to get total friend count
postSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('users', userSchema);

module.exports = Users;
