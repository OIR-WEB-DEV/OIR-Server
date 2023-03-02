const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a FirstName"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide a LastName"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide a Email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"]
    },
    profilePic: {
        data: Buffer,
        contentType: String
    },
    userType: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const model = mongoose.model("Users", userSchema);

module.exports = model;