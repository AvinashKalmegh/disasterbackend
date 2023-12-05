const joingroupModel = require("../Models/joingroup.model");
const UserModel = require("../Models/user.model");



const joingroup = async (req, res) => {
    try {


        const data = new joingroupModel(req.body);

        await data.save();

        res.status(201).json({ data });

    } catch (error) {
        res.send(error.message);
    }
}

const getgroup = async (req, res) => {
    try {

        const data = await joingroupModel.find();
        const gpIds = data.map(item => item.pgId);

        // Find owners with gpId matching any of the gpIds
        const owners = await UserModel.find({ gpId: { $in: gpIds } }).select('name');

        // Respond with the retrieved data
        res.status(200).json({ groupMembers:data, owners });

    } catch (error) {
        res.send(error.message);
    }
}



module.exports = { joingroup, getgroup };