const Message = require("../models/MessageModel");
const fs = require("fs");
const path = require("path");

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { title, name, description } = req.body;

    const newMessage = new Message({
      title,
      name,
      description,
      image: req.file ? req.file.path : null,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single message by ID
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a message
const updateMessage = async (req, res) => {
  try {
    const { title, name, description } = req.body;

    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    // If a new image is uploaded, delete the old one
    if (req.file) {
      const oldImagePath = message.image;
      if (message.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          name,
          description,
          ...(req.file && { image: req.file.path }),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.image) {
      const imagePath = message.image;

      if (fs.existsSync(path.resolve(imagePath))) {
        fs.unlinkSync(path.resolve(imagePath));
      }
    }

    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
