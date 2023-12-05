const mongoose = require("mongoose");

const main = async()=>{
    const connect = await mongoose.connect(process.env.MONGODB);
    console.log("Connected to db");
}


module.exports = main;