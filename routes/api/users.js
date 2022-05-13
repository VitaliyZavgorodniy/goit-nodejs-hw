const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const { validation, validationToken } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { usersController } = require("../../controllers");

const ctrl = new usersController();

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", validationToken, ctrlWrapper(ctrl.current));

router.get("/logout", validationToken, ctrlWrapper(ctrl.logout));

module.exports = router;
