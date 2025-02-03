import express from 'express';
import { addJournal, getJournals, deleteJournal } from '../Controllers/JournalController.js';
import { getUsers, getUser, editProfile, deleteProfile} from '../Controllers/UserController.js';
import { verify } from '../Utils/WebToken.js';

const router = express.Router();

router.get("/", verify, getUsers);
router.get("/:id", verify,getUser);
router.get("/journals/:id", getJournals);
router.post("/journals/add", addJournal);
router.delete("/journals/delete/:id", deleteJournal);
router.post("/edit",verify,editProfile)
router.get("/delete",verify,deleteProfile)

export default router;