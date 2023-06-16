//.........Third party lib and module...
const bcrypt = require("bcrypt");

//.........custome libraries and modules...
const { UserModel } = require("../models");

//------controller functions--
const { model } = require("mongoose");

//User registration
const UserRegister = async (req, res) => {
  // Request body
  const {
    fullName,
    emailAddress,
    password,
    phoneNumber,
    gender,
    userType,
    dateCreated,
    timeCreated,
  } = req.body;

  //Check if gmail or phone number already exist

  const user = await UserModel.findOne({
    $or: [{ emailAddress }, { phoneNumber }],
  }).exec();

  if (user) {
    return res.status(400).json({
      status: false,
      error: {
        massage: "Email or phone number already exist!",
      },
    });
  }

  //Paaword hashing
  const hashedPassword = await bcrypt.hash(password, 8);

  //New user
  const newUser = new UserModel({
    fullName,
    emailAddress,
    password: hashedPassword,
    phoneNumber,
    gender,
    userType,
    dateCreated,
    timeCreated,
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json({
      status: true,
      user: savedUser,
      success: {
        message: "Successfully registered a new user!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to register a new user!",
      },
    });
  }
};

module.exports = { UserRegister };
