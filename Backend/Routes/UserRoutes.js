import express from "express";
import {
  addJournal,
  getJournals,
  deleteJournal,
} from "../Controllers/JournalController.js";
import {
  getUsers,
  getUser,
  editProfile,
  deleteProfile,
} from "../Controllers/UserController.js";
import { verify } from "../Utils/WebToken.js";

const router = express.Router();

router.get("/", verify, getUsers);
router.get("/:id", verify, getUser);
router.post("/edit", verify, editProfile);
router.delete("/delete", verify, deleteProfile);
router.get("/journals/:id", verify, getJournals);
router.post("/journals/add", verify, addJournal);
router.delete("/journals/delete/:id", verify, deleteJournal);

export default router;
