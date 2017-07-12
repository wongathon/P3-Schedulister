import axios from "axios";

const API = {

  getTasks: function() {
    return axios.get("/api/task");
  },

  saveTask: function(task) {
    return axios.post("/api/task", {task});
  },

  updateTask: function(task) {
    return axios.put("/api/task", {task});
  },

  deleteTask: function(id) {
    return axios.delete(`/api/task/${id}`);
  }

};