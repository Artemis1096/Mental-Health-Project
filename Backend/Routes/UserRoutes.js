import express from 'express';
import { getUsers, getUser, editProfile, deleteProfile} from '../Controllers/UserController.js';
import { verify } from '../Utils/WebToken.js';

const router = express.Router();

router.get("/", verify, getUsers);
router.get("/:id", verify,getUser);
router.post("/edit",verify,editProfile)
router.get("/delete",verify,deleteProfile)

export default router;