const express = require("express");
const getAccess = require("../Controllers/access.controller");

const AccessRouter = express.Router();


AccessRouter.post("/",getAccess);


module.exports = AccessRouter;