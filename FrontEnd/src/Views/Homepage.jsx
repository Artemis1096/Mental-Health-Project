import React, { useEffect, useState } from "react";
import "../Styles/HomePage.css";
import Quotes from "../../Data/quotes.json";
import MoodComponent from "../Components/MoodComponent";
import Loader from "../Components/Loader";

const Homepage = () => {
  const [todayQuote, setTodayQuote] = useState({ Quote: "", Author: "" });
  const [isLoading, setIsLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const today = new Date();
    const index = today.getDate() % Quotes.length;
    setTimeout(() => {
      setTodayQuote(Quotes[index]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="main flex flex-col bg-amber-400 w-full min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <MoodComponent />
      <div className="text-center mb-7 shadow-xl rounded-2xl w-full p-4 sm:p-6 md:p-8">
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-indigo-500 rubik-moonrocks-regular text-start">
          Welcome
        </p>
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-purple-600 text-center permanent-marker-regular font-semibold my-3">
          {userData?.name || "Guest"}
        </p>
      </div>
      {/* Quote Box */}
      <div className="quote-box bg-blue-100 text-black p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 permanent-marker-regular">
          Today&apos;s Quote
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed">
          &quot;{todayQuote.Quote}&quot;
        </p>
        <span className="text-base sm:text-lg font-semibold mt-4 italic block">
          ~ {todayQuote.Author}
        </span>
      </div>
    </div>
  );
};

export default Homepage;
