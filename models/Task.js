var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var taskSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: "Please enter a task!"
  },

  active: {
    type: Boolean,
    default: true //set to false if date or recurs
  },

  taskCreated: {
    type: Date,
    default: Date.now
  },

  taskDate: Date, //set START DATE of recurrance, or if not recurring, set ONE TIME DATE
  nextDate: Date, //saves next date for recurrence, NULL if empty 
  recurAny: Boolean,//indicate is if recurrs
  recurAmount: Double,//amount of time between recurrences.
  recurFrequency: String,  // values daily, monthly, weekly. will use checkboxes to set. If NULL, it is ONE TIME
}
  
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;