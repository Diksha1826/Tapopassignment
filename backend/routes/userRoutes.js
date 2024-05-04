const { LoginUser, GetCurrentUser } = require("../controllers/userController");
const userRouter = require("express").Router();
const multer = require("multer");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const  cloudinary_js_config  = require("../config/cloudinaryConfig");


const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

userRouter.post("/register-user", multer({ storage: storage }).single("file") , 
async (req, res) => {
    try {
      const { username, email, password, phonenumber , country , gender } = req.body;
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
  
      const result = await cloudinary_js_config.uploader.upload(req.file.path, {
        folder: "BidHub",
      });
  
      //saving user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        phonenumber,
        profilePic: result.secure_url ,
        country , 
        gender ,
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
  }
);


userRouter.post("/register-user-google" , async(req, res)=>{
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: true,
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      username,
      email,
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
})







userRouter.post("/login-user", LoginUser);
userRouter.post("/get-current-user" , GetCurrentUser);

module.exports = userRouter;
