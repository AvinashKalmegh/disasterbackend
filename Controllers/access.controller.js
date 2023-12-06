const EntryModel = require("../Models/entry.model");



const getAccess = async (req, res) => {
    try {

        const payload = req.body;

        const data = await EntryModel.findOne({ email: payload.email });
        // console.log(data.email);
        if(data){
            res.status(201).json({ "token" :"access" });

        }
        else{
            res.status(400).json({"result":"wrong email"});
        }


    } catch (error) {
        res.send(error.message);
    }
}

module.exports = getAccess;