import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sunset from "../../Assets/sunset.jpg";
import LikeButton from "../ArticlesPage/LikeButton";
import axios from "axios";

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
      // Send the like/unlike request to the backend
      // await axios.put(
      //   `http://localhost:8000/api/articles/like/${article._id}`,
      //   {},
      //   { withCredentials: true }
      // );
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  return (
    <div className="max-w-84 rounded-xl shadow-lg bg-gray-900 p-4">
      <img
        className="w-full border-1 rounded-md border-purple-300 h-40"
        src={article.image ? article.image : Sunset}
        alt="Article Cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-purple-600">
          {article.title.slice(0, 50)}
        </div>
        <p className="text-white break-words text-base">
          {article.content.slice(0, 50)}...
        </p>
      </div>

      <div className="flex justify-center m-5">
        <Link to={`${article._id}`}>
          <button className="!bg-purple-500 hover:!bg-purple-700 text-white font-semibold rounded-full px-4 py-2 transition duration-300 ease-in-out whitespace-nowrap">
            Read More
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-wrap space-x-2">
          {article.category.map((category) => (
            <span
              key={category}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300"
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
