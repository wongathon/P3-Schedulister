var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is required",
    unique: true
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
    unique: true
  },
  password: {
    type: String,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be at least 6 characters."
    ]
  },
  passwordc: {
    type: String,
  },

  userCreated: {
    type: Date,
    default: Date.now
  },

  todos: [{
    //todo Schema info
    type: Schema.Types.ObjectId,
    ref: "Task"
  }]

});

userSchema.methods.validatePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password).then(callback)
};

userSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


var User= mongoose.model('User', userSchema);

module.exports = User;
