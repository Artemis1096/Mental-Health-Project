import jwt from "jsonwebtoken";

export const generate = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.PHASE === "production",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

export const verify = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(400).json({ error: "Authentication failed" });

  jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
    if (error) return res.status(400).json({ error: "Invalid token" });

    req.userId = data.userId;
    next();
  });
};
