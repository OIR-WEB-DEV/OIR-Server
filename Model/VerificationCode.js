const mongoose = require('mongoose')

const VerificationCodeSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    code:{
        type: String,
        requied: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})

const model = mongoose.model("VerificationCode", VerificationCodeSchema);

module.exports = model;