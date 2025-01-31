import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './Config/DBConfig.js';
import AuthRoutes from './Routes/AuthRoutes.js';
import MessageRoutes from './Routes/MessageRoutes.js'

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

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/message",MessageRoutes)