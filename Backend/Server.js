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
//middlewares and utils
import { setupGoogleAuth } from "./Config/googleAuthConfig.js";
import connectDB from "./Config/DBConfig.js";
import { verify } from "./Utils/WebToken.js";
import upload from "./Middlewares/upload.js";
import {app, server} from './socket/socket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setupGoogleAuth(app);

dotenv.config();

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  try {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

app.use(cookieParser());
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

app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);
app.use("/music", express.static(musicDir));
app.use("/images", express.static(imagesDir));
app.use("/api/message", MessageRoutes);
app.use("/api/articles", ArticleRoutes);
app.use("/api/friends", FriendshipRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/tasks", TaskRoutes);

// ------------------------------------------------------------------------------------------------------------------------------
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

// File upload route, will be used when a article is posted or updated
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    // console.log('File uploaded:', req.file);
    res.status(200).json({ message: "Image uploaded successfully" });
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
});
