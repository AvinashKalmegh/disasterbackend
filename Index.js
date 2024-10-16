const express = require("express");
const cors = require("cors");
const main = require("./Config/db");
const UserRouter = require("./Routes/user.route");
const AllSimsRouter = require("./Routes/allsims.route");
const StartSimRouter = require("./Routes/startsim.route");
const JoinGroupRouter = require("./Routes/joingroup.route");
const JoinLobbyRouter = require("./Routes/joinlobby.route");
const EntryRouter = require("./Routes/entry.route");
const AccessRouter = require("./Routes/access.route");
require("dotenv").config();

const PORT = 8010;


const app = express();
app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/api2/user",UserRouter);
app.use("/api2/allsim", AllSimsRouter);
app.use("/api2/startsim",StartSimRouter);
app.use("/api2/joingroup",JoinGroupRouter);
app.use("/api2/joinlobby",JoinLobbyRouter);
app.use("/api2/entry",EntryRouter);
app.use("/api2/access",AccessRouter);


app.listen(PORT, ()=>{
    main();
    console.log(`Connected to server at port ${PORT}`);
})