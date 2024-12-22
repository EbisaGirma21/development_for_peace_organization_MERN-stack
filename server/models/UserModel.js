const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static create method
userSchema.statics.createUser = async function (
  firstName,
  middleName,
  lastName,
  gender,
  email,
  role,
  phoneNumber,
  address,
  password
) {
  if (!password || !firstName || !middleName || !lastName || !gender || !role) {
    throw Error("All fields must be filled");
  }
  if (email && !validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (email && exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    middleName,
    lastName,
    gender,
    email: email ? email : null,
    role,
    phoneNumber,
    address,
    password: hash,
  });
  return user;
};

// static login method
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  let user;

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

  if (isEmail) {
    user = await this.findOne({ email: username });
  }
  if (!user) {
    throw Error("Invalid Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

// Static method to initialize a super admin
userSchema.statics.initSuperAdmin = async function () {
  if (!validator.isStrongPassword(process.env.PASSWORD)) {
    throw new Error("Password not strong enough");
  }
  const exists = await this.findOne({ role: "admin" });
  if (exists) {
    console.log("Admin already exists. Skipping initialization.");
    return;
  }

  const requiredEnvVars = [
    "FIRST_NAME",
    "MIDDLE_NAME",
    "LAST_NAME",
    "GENDER",
    "EMAIL",
    "ROLE",
    "PHONE_NUMBER",
    "ADDRESS",
    "PASSWORD",
  ];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Environment variable ${varName} is missing`);
    }
  });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(process.env.PASSWORD, salt);

  // Create the superadmin
  const superAdmin = await this.create({
    firstName: process.env.FIRST_NAME,
    middleName: process.env.MIDDLE_NAME,
    lastName: process.env.LAST_NAME,
    gender: process.env.GENDER,
    email: process.env.EMAIL,
    role: process.env.ROLE,
    phoneNumber: process.env.PHONE_NUMBER,
    address: process.env.ADDRESS,
    password: hash,
  });

  console.log("Admin initialized successfully:", superAdmin.email);
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to update the password
userSchema.methods.updatePassword = async function (newPassword) {
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Password not strong enough");
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(newPassword, salt);
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
