const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const {
  validation,
  validationId,
  validationToken,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contactsController } = require("../../controllers");

const ctrl = new contactsController();

router.get("/", validationToken, ctrlWrapper(ctrl.getAll));

router.get("/:id", validationToken, validationId, ctrlWrapper(ctrl.getById));

router.delete(
  "/:id",
  validationToken,
  validationId,
  ctrlWrapper(ctrl.removeById)
);

router.post(
  "/",
  validationToken,
  validation(schemas.add),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:id",
  validationToken,
  validationId,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validationToken,
  validationId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavoriteById)
);

module.exports = router;
