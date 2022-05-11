const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const { validation, validationId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", validationId, ctrlWrapper(ctrl.getById));

router.delete("/:id", validationId, ctrlWrapper(ctrl.removeById));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  validationId,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validationId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavoriteById)
);

module.exports = router;
