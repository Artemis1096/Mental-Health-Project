import express from 'express';
import { 
    create, 
    getArticleDetails, 
    toggleLike, 
    remove, 
    update , 
    getArticlesCategoryWise,
    getArticles
} from '../Controllers/ArticleController.js';
import { verify } from '../Utils/WebToken.js';
// import { isAdmin } from '../Utils/WebToken.js';

const router = express.Router();

router.post("/create",verify, create);
router.put("/update/:id", verify, update);
router.delete("/delete/:id",verify, remove);

router.get("/", verify, getArticles);
router.get("/search",verify, getArticlesCategoryWise);
router.get("/:id",verify, getArticleDetails);
router.put("/like/:id",verify, toggleLike);


export default router;