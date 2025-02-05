import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sunset from "../../Assets/sunset.jpg";
import LikeButton from "../ArticlesPage/LikeButton";
import axios from "axios";

const ArticleCard = ({ article }) => {
  console.log(`http://localhost:8000/public/article_images/${article.image}`);
  const [likes, setLikes] = useState(article.likes);
  const [isLiked, setIsLiked] = useState(false); // Track the state of like (whether it's liked or not)

  const handleLike = async () => {
    try {
      // Optimistically update the like count
      setLikes((prevLikes) => prevLikes + (isLiked ? -1 : 1)); // Increase or decrease likes based on the previous state
      setIsLiked((prevIsLiked) => !prevIsLiked); // Toggle the liked state

      // Send the like/unlike request to the backend
      await axios.put(`http://localhost:8000/api/articles/like/${article._id}`);
    } catch (error) {
      console.log(error);
      // If the API call fails, revert the UI update
      setLikes((prevLikes) => prevLikes - (isLiked ? -1 : 1));
      setIsLiked((prevIsLiked) => !prevIsLiked);
    }
  };

  return (
    <div className="max-w-84 rounded-xl shadow-lg bg-gray-900 p-4">
      <img
        className="w-full"
        src={article.image ? `http://localhost:8000/public/article_images/${article.image}` : Sunset}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{article.title}</div>
        <p className="text-white text-base">{article.content}</p>
      </div>

      <div className="flex justify-center m-5">
        <Link to={`${article._id}`}>
          <button className="!bg-purple-500 hover:!bg-purple-700 text-white font-semibold rounded-full px-4 py-2 transition duration-300 ease-in-out whitespace-nowrap">
            Read More
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-gray-900 rounded-lg shadow-lg">
        {/* Categories Section */}
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

        {/* Like Section */}
        <LikeButton likes={likes} handleLike={handleLike} isLiked={isLiked} />
      </div>
    </div>
  );
};

export default ArticleCard;
