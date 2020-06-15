const model = require('./model');
const postModel = require('../post/model');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { findById, update } = require('./model');

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
      profile_image: req.body.profile_image,
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
  getProfile: (req, res) => {
    let user_id;
    if (req.body.user_id) {
      user_id = req.body.user_id;
    } else {
      user_id = jwt.decode(req.body.auth_token).id;
    }
    console.log(user_id);

    model.findById(user_id).then((user) => {
      if (!user) {
        res.send({ success: false, msg: 'User not found' });
      }

      postModel.find({ user_id: user_id }).then((posts) => {
        res.send({
          success: true,
          details: {
            display_name: user.first_name + ' ' + user.last_name,
            profile_image: user.profile_image,
            posts: posts,
          },
        });
      });
    });
  },
  updateProfile: async (req, res) => {
    let user_id = jwt.decode(req.body.auth_token).id;
    let updatedImage = { profile_image: req.body.profile_image };

    let userQuery = { _id: user_id };
    let postQuery = { user_id: user_id };

    await model.findOneAndUpdate(userQuery, updatedImage);
    const updatePosts = await postModel.updateMany(postQuery, updatedImage);

    console.log(updatePosts.nModified);
    res.send('Updated Successfully');
  },
};
