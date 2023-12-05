const express = require("express");
const startsim = require("../Controllers/startsim.controller");

const StartSimRouter = express.Router();


StartSimRouter.post("/",startsim);


module.exports = StartSimRouter;