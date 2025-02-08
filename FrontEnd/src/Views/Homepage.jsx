import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import "../Styles/HomePage.css";
import Quotes from "../../Data/quotes.json";
import MoodComponent from "../Components/MoodComponent";
import Loader from "../Components/Loader";
import bg from "../Assets/bgx.jpeg";
import TaskList from "../Components/TaskList";

const Homepage = () => {
  const [todayQuote, setTodayQuote] = useState({ Quote: "", Author: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [showMoodComponent, setShowMoodComponent] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!userData) return;

    const fetchMoodStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mood/check",
          {
            withCredentials: true,
          }
        );

        setShowMoodComponent(!response.data.hasSubmitted);
      } catch (error) {
        console.error("Error checking mood status:", error);
      }
    };

    fetchMoodStatus();

    const index = new Date().getDate() % Quotes.length;
    setTimeout(() => {
      setTodayQuote(Quotes[index]);
      setIsLoading(false);
    }, 1000);
  }, [userData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    // The parent container is set to relative so that the absolutely positioned image
    // will be relative to this container. The container expands as your content grows.
    <div className="relative flex flex-col min-h-screen pr-10 bg-cyan-700  -z-50">
      {/* Background image rendered with an img tag */}
      <div className=" w-full h-full ">
        <img
          src={bg}
          alt="Background"
          className="absolute  w-full h-full  rounded-2xl"
          loading="lazy"
        />
      </div>

      {/* Content container placed above the background image with a semi-transparent background */}
      <div className="relative z-10  bg-opacity-80 min-h-screen">
        {/* Show MoodComponent only if user has NOT submitted */}
      {showMoodComponent && <MoodComponent onMoodSubmit={() => setShowMoodComponent(false)} />}
        {/* Example Welcome Sections */}
        <div className="text-center mb-7  rounded-2xl w-full">
          <p className="text-8xl font-extrabold ml-5 text-start text-indigo-500 mb-4">
            Welcome
          </p>
          <p className="text-8xl text-purple-600 text-center font-semibold my-3">
            {userData?.name || "Guest"}
          </p>
        </div>
        {/* <TaskList/> */}

        {/* Quote Box */}
        <div className="bg-blue-100 mt-40 text-black p-8 md:p-10 rounded-2xl shadow-2xl max-w-2xl mb-20 w-full text-center mx-auto">
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

        <div className="h-96 w-full"></div>
        <div className="h-96 w-full"></div>
        <div className="h-96 w-full"></div>
        <div className="h-96 w-full"></div>
        <div className="h-96 w-full"></div>
        <div className="h-96 w-full"></div>
      </div>
    </div>
  );
};

export default Homepage;
