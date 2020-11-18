const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  followers: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    handle: {
        type: String
    }
  }],
  following: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    handle: {
        type: String
    }
  }],
}, {
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);