import express from 'express'
import { getMessage, sendMessage } from '../Controllers/MessageController.js'
import {verify} from '../Utils/WebToken.js'
const router=express.Router()
router.post("/send/:id",verify,sendMessage)
router.get("/get/:id",verify,getMessage)

export default router
