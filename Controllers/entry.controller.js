const EntryModel = require("../Models/entry.model");
const nodemailer = require("nodemailer");

const smtpConfig = {
    host: 'smtp.ionos.com',
    port: 587,
    auth: {
        user: 'newsletter@cyberbriefs.com',
        pass: 'GetOurNewsletter12#$()'
    }
};

const sendEmail = async (email, link) => {
    try {
        const transporter = nodemailer.createTransport(smtpConfig);

        const mailOptions = {
            from: smtpConfig.auth.user,
            to: email,
            subject: 'Disaster Management Simulation',
            text: `Please click on the following link to proceed ${link}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { result: "Email sent successfully" };
    } catch (error) {
        throw new Error("Error sending email");
    }
};

const sendEmailAkshay = async (email, firstName, lastName, mobile) => {
    try {
        let fullname = `${firstName} ${lastName}`;
        const transporter = nodemailer.createTransport(smtpConfig);

        const mailOptions = {
            from: smtpConfig.auth.user,
            to: "akshay.kumar@onesmarter.com",
            subject: 'New user registered on simulation',
            text: `New email registered to our simulation: \n ${fullname} \n ${email} \n ${mobile}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { result: "Email sent successfully" };
    } catch (error) {
        throw new Error("Error sending email");
    }
};

const sendEmailVikram = async (email, firstName, lastName, mobile) => {
    try {
        let fullname = `${firstName} ${lastName}`;
        const transporter = nodemailer.createTransport(smtpConfig);

        const mailOptions = {
            from: smtpConfig.auth.user,
            to: "vikram@vikramsethi.com",
            subject: 'New user registered on simulation',
            text: `New email registered to our simulation: \n ${fullname} \n ${email} \n ${mobile}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { result: "Email sent successfully" };
    } catch (error) {
        throw new Error("Error sending email");
    }
};

const postEntry = async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload);
        const data = await EntryModel.findOne({ email: payload.email });
        const obj = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            mobile: payload.mobile,
            email: payload.email,
            access : payload.access
        };

        if(payload.email.endsWith('.edu')){
            obj.access = true;
        }
        else{
            obj.access = false;
        }

        if (data) {
            res.status(203).send({ result: "Email already registered" });
        } else {
            let saveResult;
            let saveEmail;
            if (payload.email.endsWith('.edu')) {
                // Send email before adding to the database
                await sendEmail(payload.email, payload.link);
                await sendEmailAkshay(payload.email, payload.firstName, payload.lastName, payload.mobile);
                await sendEmailVikram(payload.email, payload.firstName, payload.lastName, payload.mobile)

                const newUser = new EntryModel(obj);
                saveResult = await newUser.save();
            } else {
                await sendEmailAkshay(payload.email, payload.firstName, payload.lastName, payload.mobile)
                await sendEmailVikram(payload.email, payload.firstName, payload.lastName, payload.mobile)

                const newUser = new EntryModel(obj);
                saveEmail = await newUser.save();
            }

            if (saveResult) {
                res.status(201).send({ result: "Email added to database successfully" });
            }
            else if (saveEmail) {
                res.status(202).send({ result: "Email added to database successfully" });

            }
            else {
                res.status(500).send({ result: "Failed to save email to the database" });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = postEntry;
