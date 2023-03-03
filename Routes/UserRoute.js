const { login, register, verifyUser, sendOTP } = require("../Controller/AuthController");

const router = require("express").Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verifyUser/:userId").post(verifyUser);
router.route("/sendOTP/:userId").get(sendOTP);

module.exports = router;
