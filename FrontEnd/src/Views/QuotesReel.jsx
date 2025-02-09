import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const QuoteReel = () => {
  const [articles, setArticles] = useState([]); // ✅ Use an array instead of an object
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/articles", {
          withCredentials: true,
        });
        console.log(response.data.data); // Log the response

        const fetchedArticles = response.data.data.slice(0, 3); // ✅ Ensure it's an array
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles]); // ✅ Depend on `articles` to avoid errors

  return (
    <div className="w-full h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 overflow-hidden relative h-96 flex justify-center items-center text-gray-800">
        <AnimatePresence mode="wait">
          {articles.length > 0 && (
            <motion.div
              key={articles[currentIndex]?.id || currentIndex} // ✅ Unique key
              className="absolute flex flex-col items-center text-center w-full px-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <img
                src={articles[currentIndex].image}
                alt="Quote visual"
                className="w-full h-56 object-cover rounded-xl shadow-md mb-6 border-4 border-indigo-300"
              />
              <p className="text-gray-900 text-2xl font-semibold italic mb-4">
                “{articles[currentIndex].title}”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuoteReel;
