var Userdb = require("../model/model");

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

//Retrive and return all/single users


exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving user information",
          });
      });
  }
};


//Update the user

exports.update = (req, res) => {
  if (!req.body) {
    return res
    .status(400)
    .send({message:"data to update can't be empty"})
  }
  const id = req.params.id;  
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
  .then(data=>{
    if(!data){
      res.status(404).send({message:`Can't update user with${id},may b user not found`})
    }else{
      res.send(data)
    }
  })
  .catch(err=>{
    res.status(400).send({message:"error occuring Updation"})
  })
};

// delete the user with id

exports.delete = (req, res) => {
  const id = req.params.id;  
  
  Userdb.findByIdAndDelete(id)
  .then(data=>{
    if(!data){
      res.send(404).send({message:`cannot delete with id ${id}`,})
    }else{
      res.send({message:"User was deleted successfully"})
    }
  })
  .catch(err=>{
    res.status(500).send({message:
      `could not delete with id${id}`
    })
  })



};
