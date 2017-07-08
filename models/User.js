var mongoose = require("mongoose");

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

var User = mongoose.model('User', userSchema);

module.exports = User;