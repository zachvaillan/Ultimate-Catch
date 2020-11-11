const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FishSchema = new Schema({
  habitat: {
    type: String
  },
  location: {
    type: String
  }

});

const Fish = mongoose.model('Fish', FishSchema );
module.exports = Fish;