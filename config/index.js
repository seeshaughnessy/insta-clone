module.exports = {
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGO_URL || 'mongodb://127.0.0.1/insta-clone',
  secret: process.env.SECRET || 'CodingIsCool',
};
