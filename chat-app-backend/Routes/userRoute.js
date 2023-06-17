const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/").get(allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
