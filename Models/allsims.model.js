const mongoose = require("mongoose");

const allsimsSchema = mongoose.Schema({
    simname: String,
    detail: String,
    imgUrl: String,
    route: String
})


const AllsimsModel = mongoose.model("allsims",allsimsSchema);


module.exports = AllsimsModel;