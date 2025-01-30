import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './Config/DBConfig.js';
import AuthRoutes from './Routes/AuthRoutes.js';
import {setupGoogleAuth} from './Config/googleAuthConfig.js';
import { verify } from './Utils/WebToken.js';

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

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : true,
    credentials : true
}));

app.use("/api/auth", AuthRoutes);

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        return res.send('dashboard');
    }
    verify(req, res, () => {
        res.send('dashboard');
    });
});


app.get('/', (req, res) => {
    res.send('Welcome to Mental-Health-app');
});
