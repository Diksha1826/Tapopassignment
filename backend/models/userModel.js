const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String ,
        required: true ,
        min: 3 ,
    } ,
    email:{
        type: String ,
        required: true ,
        unique: true ,
    } ,
    password:{
        type: String ,
        required: true ,
    } ,
    phonenumber:{
        type: Number ,
        required: true ,
    } ,
    username:{
        type: String ,
        required: true ,
    } ,
    profilePic: {
        type: String ,
        default: "",
    } ,
} , {
    timestamps: true 
});

const User = mongoose.model("user" , userSchema);

module.exports = User;