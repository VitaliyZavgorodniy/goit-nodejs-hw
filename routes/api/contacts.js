const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.add);
router.delete("/:id", ctrl.removeById);
router.put("/:id", ctrl.updateById);

module.exports = router;
