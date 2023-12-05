const EntryModel = require("../Models/entry.model");
const nodemailer = require("nodemailer");

const smtpConfig = {
    'host': 'smtp.ionos.com',
    'port': 587,
    'auth': {
        'user': 'newsletter@cyberbriefs.com',
        'pass': 'GetOurNewsletter12#$()'
    }
};

const sendEmail = async (email, link) => {
    // Check if the email domain is .edu
    if (!email.endsWith('.edu')) {
        console.log('Email domain is not .edu. Rejecting...');
        return false;
    }

    const transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
        from: smtpConfig.auth.user,
        to: email,
        subject: 'Disaster Management Simulation',
        text: `Please click on the following link to proceed ${link}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return info.response;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

const postEntry = async (req, res) => {
    try {
        const payload = req.body;
        const data = await EntryModel.findOne({ email: payload.email });
        let obj = {
            firstName :payload.firstName,
            lastName : payload.lastName,
            mobile : payload.mobile,
            email : payload.email
        }

        if (data) {
            if (payload.email.endsWith('.edu')) {
                // Send email before adding to the database
                const emailSent = await sendEmail(payload.email, payload.link);
            res.status(201).send({ result: "User already present" });
            }
           else{
                    const newUser = new EntryModel(obj);
                    await newUser.save();
                    res.status(201).send({ result: "Email added to database successfully" });
           }
        } else {
            // Check if email domain is .edu
            if (payload.email.endsWith('.edu')) {
                // Send email before adding to the database
                const emailSent = await sendEmail(payload.email, payload.link);
                console.log(emailSent);
                if (emailSent) {
                    const newUser = new EntryModel(obj);
                    await newUser.save();
                    res.status(201).send({ result: "Email added to database successfully" });
                } else {
                    res.status(500).send({ result: "Failed to send email" });
                }
            } else if(!payload.email.endsWith('.edu')){
                const newUser = new EntryModel(obj);
                    await newUser.save();
                    res.status(201).send({ result: "Email added to database successfully" });
                }
                else{
                    
                    res.status(500).send({ result: "Email domain is not .edu. Rejecting..." });
            }
        }
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = postEntry;
