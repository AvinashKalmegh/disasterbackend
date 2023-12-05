const AllsimsModel = require("../Models/allsims.model");



const getSim = async(req, res)=>{
    try {
        let data = await AllsimsModel.find();
        res.status(200).send({"result" : data});
    } catch (err) {
        res.send(error.message);
    }
}
const addSim = async(req, res)=>{
        try {
            let data = new AllsimsModel(req.body);
            await data.save();
            res.status(200).send({"result" : data});
        } catch (err) {
            res.send(error.message);
        }
}

module.exports = {addSim, getSim};