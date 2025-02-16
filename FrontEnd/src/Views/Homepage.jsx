import "../Styles/HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Quotes from "../../Data/quotes.json";
import MoodComponent from "../Components/MoodComponent";
import Loader from "../Components/Loader";
import bg from "../Assets/bgx.jpeg";
import QuoteReel from "./QuotesReel";
import TaskList from "../Components/TaskList";
import profile from "../Assets/ProfileVideo.gif";

// Please add comments when adding or fixing anything in the code.

const Homepage = () => {
  // State to store the quote of the day
  const [todayQuote, setTodayQuote] = useState({ Quote: "", Author: "" });
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to track whether to show the MoodComponent
  const [showMoodComponent, setShowMoodComponent] = useState(false);

  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!userData) return;

    // Function to check if the user has submitted mood status
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
  }, [userData]);

  const TOTAL_QUOTES = 48000;

  // Function to calculate the day of the year
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Function to generate a daily index for selecting a quote
  const generateDailyIndex = () => {
    const year = new Date().getFullYear();
    const dayOfYear = getDayOfYear();

    // Create a unique seed using year + day
    const seed = `${year}${dayOfYear}`;

    // Hash function to get an index in range 0 to 47999
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) % TOTAL_QUOTES;
    }

    return hash; // Ensures index is between 0 and 47999
  };

  useEffect(() => {
    // Generate a daily index and set today's quote
    const index = generateDailyIndex();
    setTodayQuote(Quotes[index]);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative flex flex-col min-h-screen pr-10 bg-cyan-700">
      {/* Background image */}
      <div className="w-full h-full">
        <img
          src={bg}
          alt="Background"
          className="absolute w-full h-full rounded-2xl"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 bg-opacity-80 min-h-screen">
        {/* Show MoodComponent only if user has NOT submitted */}
        {showMoodComponent && (
          <MoodComponent onMoodSubmit={() => setShowMoodComponent(false)} />
        )}

        {/* Welcome section */}
        <div className="w-full mt-25">
          <h1 className="text-center drop-shadow-2xl text-white welcome-text text-8xl">
            Welcome
          </h1>
        </div>

        {/* Display user's name */}
        <div className="h-84 w-full mt-20 rounded-2xl ml-5 permanent-marker-regular">
          <h1 className="text-center text-cyan-900 text-9xl drop-shadow-2xl">
            {userData.name || "Guest"}
          </h1>
        </div>

        {/* Profile section */}
        <div className="mb-10">
          <div className="profile-card shadow-2xl rounded-2xl p-6 w-full max-w-md text-center">
            <img
              src={profile}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500 shadow-lg"
            />
            <h2 className="text-2xl font-bold text-white mt-4">
              {userData.name || "User"}
            </h2>
          </div>
        </div>

        {/* Task List component */}
        <div className="text-white bg-color w-full ml-5 task-list">
          <TaskList />
        </div>

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

        {/* Article Section */}
        <div className="article-section">
          <h1 className="text-white text-7xl text-center">Latest Articles</h1>
          <QuoteReel />
        </div>

        {/* Placeholder divs for additional content */}
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
