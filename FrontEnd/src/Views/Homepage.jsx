import React, { useEffect, useState } from "react";
import "../Styles/HomePage.css";
import Quotes from "../../Data/quotes.json";

const Homepage = () => {
  const [todayQuote, setTodayQuote] = useState({ Quote: "", Author: "" });
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const today = new Date();
    const index = today.getDate() % Quotes.length; // Get a different quote every day
    setTodayQuote(Quotes[index]);
  }, []);

  return (
    <div className="main flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-2">
      {/* Heading */}
      <div className="Heading text-center mb-10">
        <p className="text-7xl font-extrabold permanent-marker-regular text-indigo-400 mb-10">
          Welcome
        </p>
        <p className="text-5xl text-purple-600 font-semibold my-5 ">
          {userData?.name || "Guest"}
        </p>
      </div>

      {/* Quote Box */}
      <div className="quote-box bg-purple-700 bg-opacity-90 text-white p-8 md:p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 permanent-marker-regular">
          Today's Quote
        </h1>
        <p className="text-lg md:text-xl font-medium leading-relaxed">
          "{todayQuote.Quote}"
        </p>
        <span className="text-lg font-semibold mt-4 italic block">
          ~ {todayQuote.Author}
        </span>
      </div>
    </div>
  );
};

export default Homepage;
