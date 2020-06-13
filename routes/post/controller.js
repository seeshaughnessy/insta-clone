const postModel = require('./model');
const jwt = require('jsonwebtoken');
const userModel = require('../user/model');

module.exports = {
  newpost: (req, res) => {
    let user_id = jwt.decode(req.body.auth_token).id;

    userModel.findById(user_id).then((result) => {
      if (!result) {
        res.send({ success: false, msg: 'No user was found' });
        return;
      }
      let newpost = new postModel({
        user_id: user_id,
        display_name: `${result.first_name} ${result.last_name}`,
        image: req.body.image,
        desc: req.body.desc,
        timestamp: Date.now(),
      });

      newpost
        .save()
        .then((result) => {
          res.send({ success: true, result: result });
        })
        .catch((err) => {
          if (err) res.send({ success: false, error: err });
        });
    });
  },
  getPosts: (req, res) => {
    postModel
      .find()
      .then((result) => {
        // result = result.sort(function (a, b) {
        //   return b.timestamp - a.timestamp;
        // });
        res.send(result.slice().reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
