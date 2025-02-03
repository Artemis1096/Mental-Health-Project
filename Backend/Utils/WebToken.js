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
        .status(400)
        .json({ message: "You are not authorized to access this resource" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return response
        .status(400)
        .json({ message: "You are not authorized to access this resource" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    request.user = user;

    next();
  } catch (error) {
    console.log("Error in protected route middleware", error.message);
    response.status(500).json("Internal server error");
  }
};

export const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user?.userType !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
