import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
// routes
import AuthRoutes from "./Routes/AuthRoutes.js";
import MessageRoutes from "./Routes/MessageRoutes.js";
import ArticleRoutes from "./Routes/ArticleRoutes.js";
import FriendshipRoutes from "./Routes/FriendshipRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";
import TaskRoutes from "./Routes/TaskRoutes.js"
import MoodRoutes from "./Routes/MoodRoutes.js";
//middlewares and utils
import { setupGoogleAuth } from "./Config/googleAuthConfig.js";
import connectDB from "./Config/DBConfig.js";
import { verify } from "./Utils/WebToken.js";
// import upload from "./Middlewares/upload.js";
import {upload} from './Config/cloudinaryConfig.js';
import {app, server} from './socket/socket.js';
import { assignDailyTask } from "./Controllers/TaskController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setupGoogleAuth(app);

dotenv.config();

const PORT = process.env.PORT || 8080;
assignDailyTask()
server.listen(PORT, "0.0.0.0", () => {
  try {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const musicDir = path.join(__dirname, "public/music");
const imagesDir = path.join(__dirname, "public/images");
// const articleImages = path.join(__dirname, "public/article_images");

app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);
app.use("/music", express.static(musicDir));
app.use("/images", express.static(imagesDir));
// app.use("/public/article_images", express.static(articleImages));
app.use("/api/message", MessageRoutes);
app.use("/api/articles", ArticleRoutes);
app.use("/api/friends", FriendshipRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/tasks", TaskRoutes);
app.use("/api/mood", MoodRoutes);

// ------------------------------------------------------------------------------------------------------------------------------

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

// File upload route, will be used when a article is posted or updated
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ imageUrl: req.file.path });
});