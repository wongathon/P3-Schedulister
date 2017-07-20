import axios from "axios";
import moment from "moment";
//api called by components. 
//CALLS ROUTES in api Routes via URL path. 
const API = {

  getTasks: function() {
    return axios.get("/api/tasks");
  },

  //getTasksCondition
  // .get("api/task", query??)
  //where is the best place to conditionalize searches? 
  getTasksType: function(query) {
    return axios.get("/api/tasks", {params: { query: query }});
  },
  //get active tasks
  //get weekly/daily recurring tasks
  //get 'date' tasks. >> Start date, task entered day, for x times

  saveTask: function(task) {
    return axios.post("/api/tasks", task);
  },

  //update task info in here. Callo on axios.patch ._id
  //taskUpdate:

  taskComplete: function(task) {
    task.active = false;  

    //Recurring items, pushes TaskDate forward, calcs NextDate. 
    //works for d/w/m, bi-daily, etc. 
    if (task.recurAny === true && (task.recurAmount === null || task.recurAmount > 0)) {
      const recurBet = task.recurBetween === null ? 1 : task.recurBetween;  //handles if recurXTimes was null in Task Obj. 

      task.taskDate = task.nextDate;//Pushes ahead. Should work????
      task.nextDate = moment(task.taskDate).clone().add(recurBet, task.recurFrequency).format();//oh. Works forward off *new* taskDate. 
    } 

    if (task.recurAmount !== null && task.recurAmount > 0) {
      task.recurAmount--;
    }

    if (task.recurAmount === 0) { //scheduled tasks in future. 
      task.taskDate = null;
    }

    console.log("After complete:", task);

    if (task.recurAny === true) {
      const { _id, active, taskDate, nextDate, recurAmount } = task;
      return axios.patch(`/api/tasks/${_id}`, {active, taskDate, nextDate, recurAmount });
    } else {
      const { _id, active, taskDate } = task;
      return axios.patch(`/api/tasks/${_id}`, { active, taskDate });
    }

  },

  deleteTask: function(id) {
    return axios.delete(`/api/tasks/${id}`);
  },

  taskUpdate: function(task) {
    const { _id } = task;
    return axios.patch(`/api/tasks/${_id}`, task);
  },

};

export default API;