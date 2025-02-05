import React from "react";
import { FaUserEdit, FaCog } from "react-icons/fa";
import profile from "../Assets/ProfileVideo.gif";
import { useSelector } from "react-redux";

import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const userData = user.User;
  // console.log("this->", userData);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center p-6 overflow-y-auto ">
      {/* Profile Card */}
      <div className="bg-purple-200 shadow-2xl rounded-2xl p-6 w-full max-w-md text-center">
        <img
          src={profile}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500 shadow-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {userData.name}
        </h2>
        <p className="text-gray-500">User hai bhai user hai </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="flex items-center gap-2 !bg-indigo-500 text-white px-4 py-2 rounded-full shadow hover:!bg-indigo-600 transition">
            <FaUserEdit /> Edit Profile
          </button>
          <button
            className="flex items-center gap-2 
          !bg-gray-300 text-gray-800 px-4 py-2 rounded-full shadow hover:
          !bg-gray-400 transition"
          >
            <FaCog /> Delete Profile
          </button>
        </div>
      </div>
      <div className="w-full h-xl mt-5 text-black p-2 bg-white rounded-lg">
        <h1 className="text-center">Data visualization</h1>

        <Bar
          data={{
            labels: ["A", "B", "C"],
            datasets: [
              {
                label: "Good",
                data: [200, 300, 400],
              },
              {
                label: "Bad",
                data: [100, 150, 300],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
