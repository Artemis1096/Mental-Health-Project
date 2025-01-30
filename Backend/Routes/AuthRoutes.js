import express from 'express';
import {login, register, logout} from '../Controllers/AuthController.js';
import {verifyOTP, resendOTP} from '../Utils/verification.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyotp", verifyOTP);
router.post("/resendotp", resendOTP);

export default router;