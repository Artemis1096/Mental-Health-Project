import React, { useState } from "react";
import Sunset from "../../Assets/sunset.jpg";
import { FaHeart } from "react-icons/fa";
import LikeButton from "../ArticlesPage/LikeButton";
import { Link } from "react-router";
import Button from "../Button";

const ArticleCard = ({ article }) => {
  const [likes, setLikes] = useState(article.likes || 0);
  //   console.log(article.id);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <div className="max-w-84 rounded-xl  shadow-lg bg-gray-900 p-4">
      <img className="w-full" src={Sunset} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{article.title}</div>
        <p className="text-white text-base">{article.content}</p>
      </div>

      <div className="flex justify-center m-5">
        <Link to={`${article.id}`}>
          <button className="!bg-purple-500  hover:!bg-purple-700 text-white font-semibold rounded-full px-4 py-2 transition duration-300  ease-in-out whitespace-nowrap">
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
        <LikeButton likes={likes} handleLike={handleLike} />
      </div>
    </div>
  );
};

export default ArticleCard;
