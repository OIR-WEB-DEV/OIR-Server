const { login, register, verifyUser, sendOTP, forgotPasswordUserVerify, forgotPassword } = require("../Controller/AuthController");

const router = require("express").Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verifyUser/:userId").post(verifyUser);
router.route("/sendOTP/:userId").get(sendOTP);
router.route("/forgotPasswordUserVerify").post(forgotPasswordUserVerify);
router.route("forgotPassword/:userId").post(forgotPassword);

module.exports = router;
