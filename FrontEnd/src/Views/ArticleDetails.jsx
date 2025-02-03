import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Ensure correct import
import axios from "axios";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null); // Initially null to handle loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/articles/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // Depend on `id` to refetch if it changes

  if (loading) {
    return <div className="text-center text-gray-500">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8 px-8 py-12 bg-white rounded-lg shadow-lg">
      <div className="h-svh overflow-y-auto">
        <img
          src={
            article.image ||
            "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg"
          }
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        {/* Article Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          {article.title}
        </h1>

        {/* Article Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.category?.map((category, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Article Content */}
        <p className="text-gray-700 text-lg mb-6">{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetails;
