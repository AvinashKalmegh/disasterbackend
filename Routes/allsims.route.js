const express = require("express");
const { addSim, getSim } = require("../Controllers/allsims.controller");

const AllSimsRouter = express.Router();


AllSimsRouter.get("/",getSim);
AllSimsRouter.post("/addsim",addSim);


module.exports = AllSimsRouter;