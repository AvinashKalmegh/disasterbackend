const express = require("express");
const {joingroup, getgroup} = require("../Controllers/joingroup.controller");

const JoinGroupRouter = express.Router();


JoinGroupRouter.post("/",joingroup);
JoinGroupRouter.get("/getgroup",getgroup)


module.exports = JoinGroupRouter;