const mongoose = require("mongoose");

const joinlobbySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    gpId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    csId: String,
})




const JoinLobbyModel = mongoose.model("joinlobby",joinlobbySchema);


module.exports = JoinLobbyModel;