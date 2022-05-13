const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { usersController } = require("../../controllers");

const ctrl = new usersController();

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

module.exports = router;
