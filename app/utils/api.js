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
    //works for d/w/m, bi-daily, etc. 
    if (task.recurAny === true) {
      console.log(task.recurBetween);
      const recurBet = task.recurBetween === null ? 1 : task.recurBetween;  

      task.taskDate = moment(task.taskDate).clone().add(recurBet, task.recurFrequency).format();
      task.nextDate = moment(task.taskDate).clone().add(recurBet, task.recurFrequency).format();
    } else {
      //Will this work? 
      task.taskDate = null;
    }

    console.log("After complete:", task);

    if (task.recurAny === true) {
      const { _id, active, taskDate, nextDate } = task;
      return axios.patch(`/api/tasks/${_id}`, {active, taskDate, nextDate});
    } else {
      const { _id, active, taskDate } = task;
      return axios.patch(`/api/tasks/${_id}`, { active, taskDate });
    }

  },

  deleteTask: function(id) {
    return axios.delete(`/api/tasks/${id}`);
  },

  taskUpdate: function(task) {
    return axios.patch(`/api/tasks/${_id}`, task);
  },

};

export default API;