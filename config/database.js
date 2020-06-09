const mongoose = require('mongoose');
const config = require('./index');

const db = mongoose
  .connect(config.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log('An Error has Occured", err'));

module.exports = db;
