const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String,unique:true},
    mobile: Number,
    countryCode: Number,
    link:String,
    access: Boolean
})


const EntryModel = mongoose.model("entry",entrySchema);


module.exports = EntryModel;