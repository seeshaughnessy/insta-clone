const express = require('express');
const app = express();

const config = require('./config');
const db = require('./config/database');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

// Middleware
// const cors = (req, res, next) => {
//   //Allows for cross-origin
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// };
const cors = require('cors');

app.use(express.urlencoded({ limited: '50mb', extended: true })); //Help to pass form data
app.use(express.json({ limit: '50mb' })); //Passes json data
app.use(cors());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(
  config.port,
  console.log('Server has started on port %s', config.port)
);
