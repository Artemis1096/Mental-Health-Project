import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sunset from "../../Assets/sunset.jpg";
import LikeButton from "../ArticlesPage/LikeButton";
import axios from "axios";
import "../../Styles/Articles.css";

const ArticleCard = ({ article, handleLike }) => {
  const [likes, setLikes] = useState(article.likes.length);
  const [isLiked, setIsLiked] = useState(article.likedByCurrentUser);

  useEffect(() => {
    setIsLiked(article.likedByCurrentUser);
  }, [article.likedByCurrentUser]);

  const handleLikeClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/articles/like/${article._id}`,
        {},
        { withCredentials: true }
      );

      setLikes(response.data.likesCount);
      setIsLiked(response.data.likedByCurrentUser);
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  return (
    <div className="max-w-84 rounded-xl shadow-lg bg-gray-900 p-4 flex flex-col space-y-4">
      <img
        className="w-full border border-purple-300 rounded-md h-40 object-cover"
        src={
          article.image
            ? `http://localhost:8000/public/article_images/${article.image}`
            : Sunset
        }
        alt="Article Cover"
      />
      <div className="flex flex-col flex-grow">
        <div className="py-4">
          <div className="font-bold text-xl mb-2 text-white">
            {article.title.slice(0, 50)}
          </div>
          <p className="text-white pt-2 break-words text-base">
            {article.content.slice(0, 50)}...
          </p>
        </div>

        <div className="flex justify-center mt-auto">
          <Link to={`${article._id}`}>
            <button className="btn-color text-white font-semibold rounded-full px-4 py-2 transition duration-300 ease-in-out whitespace-nowrap">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-wrap space-x-2">
          {article.category.map((category) => (
            <span
              key={category}
              className="category-color text-white px-2 py-1 rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300"
            >
              #{category}
            </span>
          ))}
        </div>

        {/* Like Button */}
        <LikeButton
          articleId={article._id}
          initialLikes={likes}
          initiallyLiked={isLiked}
          handleLike={handleLikeClick}
        />
      </div>
    </div>
  );
};

export default ArticleCard;
