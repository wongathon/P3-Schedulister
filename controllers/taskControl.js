var Task = require ("../models/Task");

//uses api routes
//interacts with DB. 
module.exports = {
  //index
  index: (req, res) => {
    var query;

    req.query ? (
      query = req.query 
    ) : (
      query = (req.params.id ? {_id: req.params.id} : {})
    );

    //look at req.query find function for 
    Task.find(query)
      .then( doc => { res.json(doc) 
      }).catch( err => { res.json(err)
      });
  },
  
  create: (req, res) => {
    Task.create(req.body)
      .then( doc => {res.json(doc)
      }).catch( err => {res.json(err)
      });
  },
  update: (req, res) => {
    Task.update({_id:req.params.id}, req.body)
      .then( doc => {res.json(doc)
      }).catch( err => {res.json(err)
      });
  },
  //use in task Admin.js
  destroy: (req, res) => {
    Task.remove({_id:req.params.id})
      .then( doc => {res.json(doc)
      }).catch( err => {res.json(err)
      });
  }
};