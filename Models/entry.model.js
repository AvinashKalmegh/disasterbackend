const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
    email: {type: String,unique:true},
    access: Boolean
})


const EntryModel = mongoose.model("entry",entrySchema);


module.exports = EntryModel;