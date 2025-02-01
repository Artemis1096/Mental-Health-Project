import express from 'express';
import { create, getArticleDetails, like, remove, update , getArticlesCategoryWise} from '../Controllers/ArticleController.js';
import { verify } from 'crypto';
import { isAdmin } from '../Utils/WebToken.js';

const router = express.Router();

router.post("/create",verify, isAdmin, create);
router.put("/update/:id", verify, isAdmin, update);
router.delete("/delete/:id",verify, isAdmin, remove);

router.get("/:id", getArticleDetails);
router.put("/like/:id",verify, like);
router.get("/search", getArticlesCategoryWise);

export default router;