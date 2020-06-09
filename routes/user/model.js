const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  account_created: {
    type: String,
    default: Date.now(),
  },
});

// Add bcrypt 'hash' to password
userSchema.pre('save', function (next) {
  //Update password before saving
  let user = this;

  if (!user.isModified('password')) return next(); //Check if password is modified/new (otherwise skip)

  bcrypt.genSalt(10, function (err, salt) {
    //Add salt to password (random letters added)
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      // Convert to hash
      if (err) return next(err);

      user.password = hash; //Save hash as new password
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
