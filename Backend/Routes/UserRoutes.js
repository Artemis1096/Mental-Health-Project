import express from 'express'
import { verify } from '../Utils/WebToken.js'
import { getFriends, getUsers } from '../Controllers/UserController.js'


const router=express.Router()
router.get('/conversation',verify,getFriends)
router.get('/allusers',verify,getUsers)

export default router
