const UserModel = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signup = async(req, res)=>{
    try {
        const payload = req.body;
        const data = await UserModel.findOne({email:payload.email})

        if(data){
            res.send({result: "User already registered"});
        }
        else{
            const passwordHash = await bcrypt.hashSync(payload.password,8);
            payload.password = passwordHash;

            const newUser = UserModel(payload);
            await newUser.save();

            res.send({result: "Registration successful",name:payload.name});
        }
    } catch (error) {
        res.send(error.message);
    }
}


const signin = async(req,res)=>{
    try {
        const payload = req.body;
        let data = await UserModel.findOne({email:payload.email});
        // console.log(data);
        if(!data){
            res.send({result:"Please signup first"});
        }

        const correctPassword = await bcrypt.compareSync(
            payload.password,
            data.password
        )

        if(correctPassword){
            const token = await jwt.sign({email:data.email, userId:data._id, gpId:data.gpId},"avinashkalmegh123");
            const decoded = verifyToken(token);
            if (decoded) {
                res.send({ result: "Signin successful", token, userData: decoded });
            } else {
                res.send({ result: "Token verification failed" });
            }
        }
        else{
            res.send({result: "Please signup first"})
        }
    } catch (error) {
        res.send(error.message);
    }
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, "avinashkalmegh123");
        return decoded;
    } catch (err) {
        return null; // Token is invalid
    }
};



module.exports = {signin, signup};