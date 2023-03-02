const { login, register, verifyUser } = require("../Controller/AuthController");

const router = require("express").Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verifyUser/:userId").get(verifyUser);

module.exports = router;
