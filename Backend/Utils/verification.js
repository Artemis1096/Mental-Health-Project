import nodemailer from "nodemailer";
import User from "../Models/User.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "diwakerryan12345@gmail.com",
    pass: "eulovxvqvhrpmarh",
  },
});

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// for verifying the otp
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No account found" });
    if (user.isVerified)
      return res.status(400).json({ message: "Account already verified" });

    if (user.otp !== otp || user.otpExpiry < new Date())
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.log("Error verifying otp ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for resening the otp
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No account found" });
    if (user.isVerified)
      return res
        .status(400)
        .json({ message: "Account already verified, can't send otp" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: "diwakerryan12345@gmail.com",
      to: email,
      subject: "OTP Verification from -----------",
      text: `Your OTP is : ${otp}`,
    });

    res.status(200).json({ message: "OTP resend successfully" });
  } catch (error) {
    console.log("Error resending OTP : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for sending otp
export const sendMail = async (email, OTP) => {
  transporter.sendMail({
    from: "diwakerryan12345@gmail.com",
    to: email,
    subject: "OTP Verification from -----------",
    text: `Your OTP is : ${OTP}`,
  });
};
