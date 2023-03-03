const { generateOTP } = require("../Helper/GenerateOTP");
const { success } = require("../Helper/Response");
const { STUDENT } = require("../Helper/Role_Constant");
const Users = require("../Model/User");
const bcrypt = require("bcrypt");
const VerificationCode = require("../Model/VerificationCode")
const sendMail = require("../Services/EmailServices");
const getJwtToken = require("../Helper/GetJwtToken");


exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const isUserExist = await Users.findOne({
            email
        })
        if (isUserExist) {
            return res.status(400).json({ error: true, message: "User already exist" });
        }
        const user = await Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userType: STUDENT,
            verified: false
        });

        const generatedOTP = generateOTP(6);
        await VerificationCode.create({
            user: user._id,
            code: generatedOTP
        })

        const isEmailSent = await sendMail({ email, firstName }, "Here is your OTP to verify your account: " + generatedOTP, "Successfully register on OIR")
        if (isEmailSent === null) {
            return res.status(200).json(success("Student is register successfully but we are facing some email issue.", { id: user._id }))
        }
        return res.status(200).json(success("Student is register successfully", { id: user._id }))
    } catch (err) {
        res.status(400).json({ error: true, message: err.message });
    }
}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: true, message: "Please provide all requied fields" });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: true, message: "User doesn't exist" });
        }
        if(!user.verified){
            return res.status(400).json({ error: true, message: "User is not verified" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: true, message: "Invalide Credentials" });
        }
        const token = getJwtToken(user._id);
        const response ={
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            userType:user.userType,
            profilePic:user.profilePic,
            verified: user.verified,
            token
        }
        return res.status(200).json(success("Login Successful", response))

    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
}
exports.verifyUser = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const {code} = req.body;
        if(!userId || !code){
            return res.status(400).json({ error: true, message: "Invalide" });
        }
        const verificationCode = await VerificationCode.findOne({user:userId});
        if(verificationCode.code !== code){
            return res.status(400).json({ error: true, message: "Invalide Verification Code" });
        }
        await Users.updateOne({
            _id:userId
        },{
            verified:true
        })
        return res.status(200).json(success("User verified", {id:user._id}))

    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
}

exports.sendOTP = async (req, res, next) => {
    try {
        const {userId} = req.params;

        const user = await Users.findOne({_id:userId})
        const generatedOTP = generateOTP(6);
        await VerificationCode.updateOne(
            {
                user: userId
            }
            ,{
            code: generatedOTP
        })

        const isEmailSent = await sendMail({ email:user.email, firstName:user.firstName }, "Here is your OTP to verify your account: " + generatedOTP, "Successfully register on OIR")
        if (isEmailSent === null) {
            return res.status(200).json(success("Student is register successfully but we are facing some email issue.", { id: userId }))
        }

        return res.status(200).json(success("OTP is send successfullt", {id: userId}))

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: true, message: error.message });
    }
}
