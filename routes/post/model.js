const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const postSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  display_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
