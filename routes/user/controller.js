const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  login: (req, res) => {
    model.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400,
          });
          res.status(200).send({ msg: 'Login Successful', token: token });
        } else {
          res.status(500).send({ msg: 'Passwords did not match' });
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
        res.status(200).send({ msg: 'Register Successful', user_id: 'id' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ msg: 'Register Unsuccessful' });
      });
  },
};
