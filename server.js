const express = require('express');
const app = express();

const config = require('./config');
const db = require('./config/database');

const userRouter = require('./routes/user');

// Middleware
const cors = (req, res, next) => {
  //Allows for cross-origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(express.urlencoded({ extended: true })); //Help to pass form data
app.use(express.json()); //Passes json data
app.use(cors);

app.use('/user', userRouter);

app.listen(
  config.port,
  console.log('Server has started on port %s', config.port)
);
