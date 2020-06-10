const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  login: (req, res) => {
    model.findOne({ email: req.body.email }, (err, user) => {
      //find user via email
      if (err) {
        res.status(500).send({ auth: false, msg: err });
        return;
      }

      // If user doesn't exist send error
      if (!user) {
        res.send({ auth: false, emailError: true, msg: 'Email not found' });
        return;
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        //use method via model
        if (err) throw err;

        if (isMatch) {
          let token = jwt.sign({ id: user._id }, config.secret, {
            //set up token via jwt for 24 hours
            expiresIn: 86400,
          });
          res
            .status(200)
            .send({ auth: true, msg: 'Login Successful', token: token }); //If match, create token/set auth true
          return;
        } else {
          res.send({
            auth: false,
            passError: true,
            msg: 'Password is incorrect',
          });
        }
      });
    });
  },
  register: (req, res) => {
    let newUser = new model({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      email: req.body.email,
    });

    newUser
      .save()
      .then((result) => {
        console.log(result);
        let token = jwt.sign({ id: result._id }, config.secret, {
          //set up token via jwt for 24 hours
          expiresIn: 86400,
        });
        res
          .status(200)
          .send({ auth: true, msg: 'Register Successful', token: token }); //If match, create token/set auth true
      })
      .catch((err) => {
        if (err.code == 11000) {
          res.send({ auth: false, msg: 'Email already exists...' });
          return;
        }
        res.send({ auth: false, msg: 'An internal server error occured' });
      });
  },
};
