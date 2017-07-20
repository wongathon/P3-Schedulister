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

 

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);

};


var User= mongoose.model('User', userSchema);

module.exports = User;
