const express = require("express");
const postEntry = require("../Controllers/entry.controller");

const EntryRouter = express.Router();


EntryRouter.post("/addentry",postEntry);


module.exports = EntryRouter;