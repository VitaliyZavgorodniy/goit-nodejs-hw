const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const {
  validation,
  validationToken,
  multerUpload,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const { usersController } = require("../../controllers");

const ctrl = new usersController();

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", validationToken, ctrlWrapper(ctrl.current));

router.get("/logout", validationToken, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  multerUpload.single("image"),
  validationToken,
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
