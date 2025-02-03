import express from 'express';
import { 
    create, 
    getArticleDetails, 
    like, 
    remove, 
    update , 
    getArticlesCategoryWise,
    getArticles
} from '../Controllers/ArticleController.js';
import { verify } from 'crypto';
import { isAdmin } from '../Utils/WebToken.js';

const router = express.Router();

router.post("/create",verify, create);
router.put("/update/:id", verify, update);
router.delete("/delete/:id",verify, remove);

router.get("/", getArticles);
router.get("/search", getArticlesCategoryWise);
router.get("/:id", getArticleDetails);
router.put("/like/:id",verify, like);


export default router;