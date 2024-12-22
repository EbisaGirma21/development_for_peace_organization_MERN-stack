const express = require("express");

const {
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  changePassword,
} = require("../controllers/UserController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.post("/login", loginUser);

// GET all users (requires authentication)
router.get("/", requireAuth, requireAuth, getUsers);

// GET a single user (requires authentication)
router.get("/:id", requireAuth, getUser);

// DELETE a user (requires authentication)
router.delete("/:id", requireAuth, deleteUser);

// UPDATE a user (requires authentication)
router.patch("/:id", requireAuth, updateUser);

router.post("/change-password", requireAuth, changePassword);

module.exports = router;
