import express from 'express'
import { sendMessage } from '../Controllers/MessageController.js'
import {verify} from '../Utils/WebToken.js'
const router=express.Router()
router.post("/send/:id",verify,sendMessage)

export default router
