const express = require("express");
const joinLobby = require("../Controllers/joinlobby.controller");

const JoinLobbyRouter = express.Router();


JoinLobbyRouter.post("/",joinLobby);


module.exports = JoinLobbyRouter;