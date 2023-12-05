const mongoose = require("mongoose");

const joingroup = mongoose.Schema({
    name: String,
    pgId: {type: mongoose.Schema.Types.ObjectId,ref: "user"},
    dp: String
})


const joingroupModel = mongoose.model("allgroups",joingroup);


module.exports = joingroupModel;