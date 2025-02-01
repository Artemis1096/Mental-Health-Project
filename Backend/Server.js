import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./Config/DBConfig.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import MessageRoutes from "./Routes/MessageRoutes.js";
import { setupGoogleAuth } from "./Config/googleAuthConfig.js";
import { verify } from "./Utils/WebToken.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
setupGoogleAuth(app);

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  try {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const musicDir = path.join(__dirname, "public/music");
const imagesDir = path.join(__dirname, "public/images");

app.use("/api/auth", AuthRoutes);
app.use("/music", express.static(musicDir));
app.use("/images", express.static(imagesDir));
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);
app.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send("dashboard");
  }
  verify(req, res, () => {
    res.send("dashboard");
  });
});

app.get("/songs", (req, res) => {
  fs.readdir(musicDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Error in fetching songs" });

    const songs = files
      .filter((file) => file.endsWith(".mp3"))
      .map((file) => {
        const songName = path.parse(file).name;
        return {
          title: songName,
          src: `/music/${file}`,
          cover: `/images/${songName}.jpg`,
        };
      });
    res.status(200).json(songs);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to Mental-Health-app");
});
