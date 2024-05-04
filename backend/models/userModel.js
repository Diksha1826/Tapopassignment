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
        default: "",

        // required: true ,
    } ,
    phonenumber:{
        type: Number ,
        default: "",

        // required: true ,
    } ,
    gender:{
        type: String ,
        default: "",

        // required: true 
    } ,
    country:{
        type: String ,
        default: "",

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