const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.RegisterUser = async (req, res) => {
  try {
    const { username, email, password, phonenumber } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //saving user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phonenumber,
    });
    res.send({
      success: true,
      message: "user created successfully",
      newUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error User Registration",
    });
  }
};

module.exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.error({
        success: false,
        message: "Incorrect username or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        message: "Incorrect username or password",
        success: false,
      });
    }
    delete user.password;
    return res.json({
      success: true,
      message: `Welcome ${user.username}`,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
