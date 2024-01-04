const express = require("express");
const router = express.Router();
const HomeController = require("../../controllers/admin/actor.controller");
const validator = require("../../validators/user.validation");

router.get("/", HomeController.index);

router.get("/:id", HomeController.show);

router.post(
  "/",
  validator.createUserValidation(),
  validator.validate(),
  HomeController.create
);

router.put(
  "/:id",
  validator.updateUserValidation(),
  validator.validate(),
  HomeController.update
);

router.delete("/:id", HomeController.delete);

module.exports = router;
