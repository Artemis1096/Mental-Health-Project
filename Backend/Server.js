import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/DBConfig.js';


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