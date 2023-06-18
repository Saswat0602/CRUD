const express = require("express");
const route = express.Router()

const services = require('../services/render')
const controller =require('../controller/controller')

//for add  home route
route.get("/",services.homeRoutes );
//for add useer
route.get("/add-user", services.addUser);
//for update useer
route.get("/update-user", services.updateUser);

//API

route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;