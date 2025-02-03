import express from 'express';
import { getUsers, getUser} from '../Controllers/UserController.js';
import { addJournal, getJournals, deleteJournal } from '../Controllers/JournalController.js';
import { verify } from '../Utils/WebToken.js';

const router = express.Router();

router.get("/", verify, getUsers);
router.get("/:id", verify,getUser);
router.get("/journals/:id", getJournals);
router.post("/journals/add", addJournal);
router.delete("/journals/delete/:id", deleteJournal);

export default router;