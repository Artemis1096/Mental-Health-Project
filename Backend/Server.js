import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Config/DBConfig.js";
import AuthRoutes from "./Routes/AuthRoutes.js";

const app = express();

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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", AuthRoutes);
