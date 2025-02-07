import React, { useEffect, useState } from "react";
import "../Styles/HomePage.css";
import Quotes from "../../Data/quotes.json";
import Loader from "../Components/Loader";

const Homepage = () => {
  const [todayQuote, setTodayQuote] = useState({ Quote: "", Author: "" });
  const [isLoading, setIsLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const today = new Date();
    const index = today.getDate() % Quotes.length; // Get a different quote every day

    setTimeout(() => {
      setTodayQuote(Quotes[index]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="main flex flex-col bg-amber-400 w-full min-h-screen  px-2">
      {/* Heading */}
      <div className=" text-center mb-7 shadow-xl  rounded-2xl    w-full">
        <p className="text-8xl font-extrabold ml-5  text-start rubik-moonrocks-regular  text-indigo-500  mb-4">
          Welcome
        </p>
        <p className="text-8xl text-purple-600  text-center permanent-marker-regular font-semibold my-3">
          {userData?.name || "Guest"}
        </p>
      </div>

      {/* Quote Box */}
      <div className="quote-box bg-blue-100 mr-200  text-black p-8 md:p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 permanent-marker-regular">
          Today&apos;s Quote
        </h1>
        <p className="text-lg md:text-xl font-medium leading-relaxed">
          &quot;{todayQuote.Quote}&quot;
        </p>
        <span className="text-lg font-semibold mt-4 italic block">
          ~ {todayQuote.Author}
        </span>
      </div>
    </div>
  );
};

export default Homepage;
