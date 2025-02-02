import express from 'express'
import { verify } from '../Utils/WebToken.js'
import { getFriends } from '../Controllers/UserController.js'


const router=express.Router()
router.get('/getFriends',verify,getFriends)

export default router