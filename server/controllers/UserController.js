const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create token
    const token = createToken(user._id);
    const role = user.role;
    const _id = user._id;

    res.status(200).json({ email, role, _id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  create user
const createUser = async (
  firstName,
  middleName,
  lastName,
  gender,
  email,
  role,
  phoneNumber,
  address
) => {
  const password = "ABCabc123@#";

  try {
    // Create the user
    const user = await User.createUser(
      firstName,
      middleName,
      lastName,
      gender,
      email,
      role,
      phoneNumber,
      address,
      password
    );

    // Create token
    const token = createToken(user._id);

    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    // Fetch user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }

    // If no specific role is handled
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// get  users
const getUsers = async (req, res) => {
  const users = await User.find({});

  if (!users) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(users);
};

// update user
const updateUser = async (
  id,
  firstName,
  middleName,
  lastName,
  gender,
  email
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      firstName,
      middleName,
      lastName,
      gender,
      email,
    }
  );
  if (!user) {
    return null;
  }
  return user;
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }
  const user = await User.findOneAndDelete({
    _id: id,
  });
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

// to delete from student
const deleteUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const user = await User.findOneAndDelete({
    _id: id,
  });
  if (!user) {
    return null;
  }
  return user;
};

// Change Password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword, id } = req.body;

  try {
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Both fields are required." });
    }

    // Get the logged-in user from the request
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }

    await user.updatePassword(newPassword);
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error during password change:", error);
    res
      .status(500)
      .json({ error: "An error occurred while changing the password." });
  }
};

module.exports = {
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
  deleteUserById,
  changePassword,
};
