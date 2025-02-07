import React, { useEffect, useState } from "react";
import Quotes from "../../Data/quotes.json";
import MoodComponent from "../Components/MoodComponent";
import Loader from "../Components/Loader";
import bg from "../Assets/bgx.jpeg";

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    // The parent container is set to relative so that the absolutely positioned image
    // will be relative to this container. The container expands as your content grows.
    <div className="relative min-h-screen pr-10 bg-cyan-700">
      {/* Background image rendered with an img tag */}
      <div className="p-2  w-full  " >
      <img
        src={bg}
        alt="Background"
        className="absolute rounded-2xl mr-10 w-full h-full "
      />
      </div>

      {/* Content container placed above the background image with a semi-transparent background */}
      <div className="relative z-10  bg-opacity-80 min-h-screen">
        <MoodComponent />

        {/* Example Welcome Sections */}
        <div className="text-center mb-7  rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>
        {/* Example Welcome Sections */}
        <div className="text-center mb-7  rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>
        {/* Example Welcome Sections */}
        <div className="text-center mb-7  rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>
        {/* Example Welcome Sections */}
        <div className="text-center mb-7  rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>

        {/* Additional sections can be added similarly */}
        <div className="text-center mb-7 shadow-xl rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>
        <div className="text-center mb-7 shadow-xl rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>
        <div className="text-center mb-7 shadow-xl rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>
        <div className="text-center mb-7 shadow-xl rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>
        <div className="text-center mb-7 shadow-xl rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>

        {/* Quote Box */}
        <div className="bg-blue-100 text-black p-8 md:p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
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
    </div>
  );
};

export default Homepage;
