import axios from "axios";

//api called by components. 
//CALLS ROUTES in api Routes
const API = {

  getTasks: function() {
    return axios.get("/api/task");
  },

  //getTasksCondition
  // .get("api/task", query??)
  //where is the best place to conditionalize searches? 
  getTasksType: function(query) {
    return axios.get("/api/task", {
      params: { query: query }
    });
  },
  //get active tasks
  //get weekly/daily recurring tasks
  //get 'date' tasks. >> Start date, task entered day, for x times

  saveTask: function(task) {
    return axios.post("/api/task", task);
  },

  //update task info in here. Callo on axios.patch ._id
  //taskUpdate:

  taskComplete: function(task) {
    task.active = false;
    const { _id, active } = task;
    return axios.patch(`/api/task/${_id}`, { active });
  },

  deleteTask: function(id) {
    return axios.delete(`/api/task/${id}`);
  }

};

export default API;