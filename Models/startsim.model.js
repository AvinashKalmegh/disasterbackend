const mongoose = require("mongoose");

const startsimSchema = mongoose.Schema({
    simname: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    gpId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    csId: String,
    route:{ type: mongoose.Schema.Types.ObjectId, ref: 'allsims' },
    jFile: Array
})




const StartSimModel = mongoose.model("startsim",startsimSchema);


module.exports = StartSimModel;