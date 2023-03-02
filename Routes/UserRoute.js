const { login, register, verifyUser } = require("../Controller/AuthController");

const router = require("express").Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verifyUser/:userId").post(verifyUser);

module.exports = router;
