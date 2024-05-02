const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.RegisterUser = async(req , res)=>{
  try {
    const {username , email , password , phonenumber } = req.body
    const user = await User.findOne({email});
    if(user){
        return res.error({
            success: false ,
            message: "User already exists"
        })
    }

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password , salt);

      //saving user 
      const newUser = await User.create({username , email , password: hashedPassword , phonenumber });
      res.send({
          success: true ,
          message: "user created successfully" ,
          newUser ,
      });     


    
    
  } catch (error) {
    return res.json({
        success: false ,
        message: "Error User Registration" 
    }) 
  }
}