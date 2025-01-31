import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const generate = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
};

export const verify = async (request, response, next) => {
  try {
    const token = request.cookies.jwt;

    if (!token) {
      return response
        .status(401)
        .json({ message: "You are not authorized to access this resource" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return response
        .status(401)
        .json({ message: "You are not authorized to access this resource" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return response.status(401).json({ message: "User not found" });
    }

    request.user = user;

    next();
  } catch (error) {
    console.log("Error in protected route middleware", error.message);
    response.status(400).json("Internal server error");
  }
};
