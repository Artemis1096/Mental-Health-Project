import express from 'express';
import {verify} from "../Utils/WebToken.js";
import { submitMood, getMood } from '../Controllers/MoodController.js';

const router = express.Router();

router.post("/set", verify, submitMood);
router.get("/get", verify, getMood);

export default router;