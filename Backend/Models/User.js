import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    DOB : {
        type : Date
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minLength : 6
    },
    otp : {
        type : String
    },
    otpExpiry : {
        type : Date
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    userType : {
        type : String,
        default : "user"
    },
    exp:{
        type:Number,
        default:0
    }
});

const User = mongoose.model("User", userSchema);

export default User;