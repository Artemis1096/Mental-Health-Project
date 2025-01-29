import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    DOB : {
        type : Date
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    friends : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            default : []
    }],
    otp : {
        type : String
    },
    otpExpiry : {
        type : Date
    },
    isVerified : {
        type : Boolean,
        default : false
    }
});

const User = mongoose.model("User", userSchema);

export default User;