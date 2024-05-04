const User = require("../models/userModel");
const bcrypt = require("bcrypt");



module.exports.RegisterUser =

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
      message: "login successful",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.GetCurrentUser = async(req, res)=>{
  try {
    const user = await User.findOne(req.body);
    if (!user) {
      return res.json({
        success: false,
        message: "current user not there",
      });
    }
    return res.json({
      success: true,
      message: "fetched currentuser successfully",
      user,
    });
    
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}