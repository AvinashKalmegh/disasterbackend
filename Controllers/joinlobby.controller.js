const JoinLobbyModel = require("../Models/joinlobby.model");
const StartSimModel = require("../Models/startsim.model");
const UserModel = require("../Models/user.model");
const ObjectId = require('mongodb').ObjectId;


const joinLobby = async (req, res) => {
    try {

        const { userId, csId, gpId } = req.body;
        const csIdFounder = await StartSimModel.find({ csId: csId })
        const csIdGenerator = csIdFounder[0].csId;
        // console.log(csIdFounder);

        if (csIdGenerator === csId) {
            const joinUser = await UserModel.findById(userId);
            // console.log(joinUser);
            let obj = {
                name: joinUser.name,
                userId: joinUser._id
            }

            const jfile = await StartSimModel.find({ csId: csId })
            jfile[0].jFile.push(obj);
            let simid = jfile[0]._id;
            console.log(jfile[0].jFile);

            const objectId = new ObjectId("652a1efa825f7ef2e160dfed"); // Assuming you have the ObjectId
            const filter = { _id: objectId };
            const update = { $set: { jFile: jfile[0].jFile } };

            const data = await StartSimModel.findOneAndUpdate(filter, update).lean().exec();

            // console.log(justId);
            // const data = await StartSimModel.findOneAndUpdate({ _id: simid }, jfile, { lean: true, new: true }).exec();
            // await data.save();


            const newJoiner = new JoinLobbyModel(req.body);
            await newJoiner.save();

            res.send({ data })
        }

    } catch (error) {
        res.send(error.message);
    }
}

module.exports = joinLobby;
