import User from '../Models/User.js';
import bcryptjs from 'bcryptjs';
import {generate} from '../Utils/WebToken.js';
import { generateOTP, sendMail} from '../Utils/verification.js';

// for register
export const register = async (req, res) => {
    try {
        const {name, email, password, confirmPassword, dob, userType} = req.body;

        const user = await User.findOne({email});
        if(user)
            return res.status(400).json("Email already registered!");

        if(password!==confirmPassword)
            return res.status(400).json({error : "Passwords don't match"});

        const OTP = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            dob,
            email,
            password : hashedPassword,
            otp : OTP,
            otpExpiry : otpExpiry,
            userType
        });

        if(newUser){
            await newUser.save();

            await sendMail(email, OTP);

            res.status(200).json({
                message : "User created successfully",
                _id : newUser._id,
                name : newUser.name,
                email : newUser.email,
                dob : newUser.dob
            });
        }else{
            res.status(400).json({error : "Invalid user data"});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

// for login
export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const passwordMatched = await bcryptjs.compare(password, user?.password || "");
        if(!user || !passwordMatched)
            return res.status(400).json({error : "Invalid email or password"});

        if(!user.isVerified)
            return res.status(400).json({message : "Account not verified, verify OTP and then try logging in!"})
        
        generate(user._id, res);

        res.status(200).json({
            name : user.name,
            email : user.email,
            message : "Logged in successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

// for logout
export const logout = async (req, res) => {
    try {
        if (!req.cookies?.jwt) {
            return res.status(400).json({ error: "No active session found" });
        }

        res.clearCookie("jwt", { sameSite: 'None', secure: true })
            .status(200)
            .json({ message: "Logged out successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};