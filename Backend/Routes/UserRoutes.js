import express from 'express';
import { getUsers, getUser} from '../Controllers/UserController.js';
import { verify } from '../Utils/WebToken.js';

const router = express.Router();

router.get("/", verify, getUsers);
router.get("/:id", verify,getUser);

export default router;