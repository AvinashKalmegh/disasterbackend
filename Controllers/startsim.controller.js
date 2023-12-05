const uuid = require('uuid');
const StartSimModel = require('../Models/startsim.model');
const { default: mongoose } = require('mongoose');


function generateUniqueSessionId() {
    return uuid.v4();
}


const startsim = async (req, res) => {
    try {
        const { simname, userId, gpId } = req.body;

        const csId = generateUniqueSessionId();

        const newSim = new StartSimModel({
            simname,
            csId,
            userId,
            gpId
            // Add more session-related data as needed
        });

        await newSim.save();

        res.status(201).json({ csId });

    } catch (error) {
        res.send(error.message);
    }
}


module.exports = startsim;