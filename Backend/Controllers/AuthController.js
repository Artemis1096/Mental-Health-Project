import User from "../Models/User.js";
import bcryptjs from "bcryptjs";
import { generate } from "../Utils/WebToken.js";
import { generateOTP, sendMail } from "../Utils/verification.js";
import Task from "../Models/task.js";

// for register
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, dob, userType, username } =
      req.body;

    let user = await User.findOne({ email });
    if (user && user.isVerified) return res.status(400).json({message : "Email already registered!"});

    user = await User.findOne({ username });
    if (user && user.isVerified) return res.status(400).json({message : "username already exists"});

    if(user)
      return res.status(200).json({message : "Lead to verify otp"});

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords don't match" });

    const OTP = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      dob,
      username,
      email,
      password: hashedPassword,
      otp: OTP,
      otpExpiry: otpExpiry,
      userType,
    });

    if (newUser) {
      await newUser.save();



      await sendMail(email, OTP);

      const dailyTaskDescription = "Medidate for 5 mins";
      const title='Daily Task'
     await Task.create({ title,description: dailyTaskDescription, user: newUser._id, status: "pending" });

      res.status(200).json({
        message: "User created successfully",
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        dob: newUser.dob,
        userType: newUser.userType,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for login
export const login = async (req, res) => {
  try {
    // console.log("inside login");
    const { username, email, password } = req.body;
    let user = null;

    if (!username) user = await User.findOne({ email });
    else user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "user not found" });

    if(user && !user.isVerified)
      return res.status(200).json({message : "Lead to verify otp"});

    const passwordMatched = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!passwordMatched)
      return res.status(400).json({ error: "Invalid password" });

    if (!user.isVerified)
      return res.status(400).json({
        message: "Account not verified, verify OTP and then try logging in!",
      });

    generate(user._id, res);

    res.status(200).json({
      name: user.name,
      username: user.name,
      email: user.email,
      userId: user._id,
      userType : user.userType,
      message: "Logged in successfully",
      exp:user.exp
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for logout
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true, // Add this for security
        sameSite: "None", // Make sure cross-origin is supported
        secure: process.env.NODE_ENV === "production", // Set to true in production, false in development
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
