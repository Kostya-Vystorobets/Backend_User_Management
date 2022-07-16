const express = require("express");
const controller = require("../controllers/user");
const { verifyRole } = require("../middleware/verifyRole");
const ROLE = require("../config/roles_list");
const router = express.Router();

router.post("/login", controller.login);
router.post("/", verifyRole(ROLE.Admin, ROLE.Boss), controller.create);
router.get(
  "/",
  verifyRole(ROLE.Admin, ROLE.Boss, ROLE.User),
  controller.getUsers
);
router.patch("/:id", verifyRole(ROLE.Admin, ROLE.Boss), controller.updeteById);

module.exports = router;
