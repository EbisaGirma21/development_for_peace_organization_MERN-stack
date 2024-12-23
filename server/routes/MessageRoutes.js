const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} = require("../controllers/MessageController");
const { uploadMessage } = require("../middleware/upload");

// Define routes
router.post("/", uploadMessage.single("image"), createMessage);
router.get("/", getMessages);
router.get("/:id", getMessageById);
router.put("/:id", uploadMessage.single("image"), updateMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
