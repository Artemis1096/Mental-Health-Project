import mongoose from 'mongoose';
import Article from '../Models/article.js';

export const create = async (req, res) => {
    try {
        const {title, content, image, category} = req.body;
        const categories = category.split(",");
        const newArticle = new Article({
            title,
            content,
            image
        });
        if(newArticle){
            newArticle.category = categories;
            await newArticle.save();
            res.status(200).json({message: 'Article created successfully', newArticle});
        }else{
            res.status(400).json({message : "error posting article"});
        }
    } catch (error) {
        console.log("error in creating article", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}

export const update = async(req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ message: "Invalid article ID" });

        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            {$set : req.body},
            {new : true}
        );

        if(!updatedArticle)
            return res.status(404).json({message : "article not found"});

        res.status(200).json({message : "article updated successfully"});

    } catch (error) {
        console.log("Error updating article", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ message: "Invalid article ID" });

        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({ message: "Article deleted successfully" });

    } catch (error) {
        console.error("Error deleting article:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getArticleDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user._id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ message: "Invalid article ID" });

        const article = await Article.findById(id);
        if(!article)
            return res.status(404).json({message : "article not found"});
        const updatedArticle = {
            ...article,
            isLikedByCurrentUser: article.likes?.includes(userId) || false
          };
          
        res.status(200).json(updatedArticle);

    } catch (error) {
        console.log("Error getting article details");
        res.status(500).json({error : "Internal server error"});
    }
}

export const getArticles = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const articles = await Article.find().lean();
        
        const articlesWithLikeStatus = articles.map((article) => ({
            ...article,
            likedByCurrentUser: article.likes.some((like) => like.equals(userId))
        }));

        // console.log(articlesWithLikeStatus);
        res.status(200).json({
            message: "success", 
            data: articlesWithLikeStatus
        });
    } catch (error) {
        console.log("Error getting articles", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user._id;

        const article = await Article.findById(id);
        if(!article)
            return res.status(404).json({message : "user not found"});

        const likedIndex = article.likes.indexOf(userId);

        if(likedIndex === -1)
            article.likes.push(userId);
        else
            article.likes.splice(likedIndex, 1);

        await article.save();

        res.status(200).json({ message: "success" , likesCount : article.likes.length, likedByCurrentUser : article.likes.includes(userId)});

    } catch (error) {
        console.error("Error liking article:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getArticlesCategoryWise = async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ message: "Category query parameter is required" });
        }

        const articles = await Article.find({ category: { $regex: category, $options: "i" } }).sort({ createdAt: -1 });
        const articlesWithLikeStatus = articles.map((article) => ({
            ...article,
            likedByCurrentUser : article.likes.includes(userId)
        }));
        res.status(200).json(articlesWithLikeStatus);
    } catch (error) {
        console.error("Error getting articles with category:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
