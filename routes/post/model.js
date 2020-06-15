const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const postSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  profile_image: {
    type: String,
    default:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.xk9p_3nOZfz7rAvy0GGz2wHaHa%26pid%3DApi&f=1',
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
