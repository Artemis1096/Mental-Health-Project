import React, { useEffect, useState } from "react";
import { FaUserEdit, FaCog } from "react-icons/fa";
import profile from "../Assets/ProfileVideo.gif";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../Features/User/UserSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { UseAuthContext } from "../Context/AuthContext";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const userData = user?.User || {};
  // console.log(userData);
  const { auth, setAuth } = UseAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDob, setUpdatedDob] = useState("");

  useEffect(() => {
    if (!userData?.id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/users/679c51c205c13eeb404ab4b5`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data.data._id);

        const newUser = {
          id: res.data.data._id,
          name: res.data.data.name,
          email: res.data.data.email,
          userType: res.data.data.userType,
        };
        // console.log(newUser);

        dispatch(addUser(newUser));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [isUpdated]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedInfo = {
        name: updatedName,
        DOB: updatedDob,
      };

      const res = await axios.post(
        `http://localhost:8000/api/users/edit`,
        updatedInfo,
        { withCredentials: true }
      );

      setIsUpdated(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/users/delete`, {
        withCredentials: true,
      });

      console.log("Profile deleted successfully:", res.data);
      setAuth(null);
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      console.error(
        "Error deleting profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      {isUpdated && (
        <div className="w-full h-full text-black flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
              Update Profile Details
            </h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleUpdateProfile}
            >
              <div>
                <label className="block text-gray-700 font-medium">
                  Update Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  onChange={(e) => setUpdatedName(e.target.value)}
                  value={updatedName}
                  placeholder="Enter Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Update Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  value={updatedDob}
                  onChange={(e) => setUpdatedDob(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="!bg-purple-600 text-white py-2 rounded-lg font-semibold hover:!bg-purple-700 transition"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center p-6 overflow-y-auto">
        {/* Profile Card */}
        <div className="bg-purple-200 shadow-2xl rounded-2xl p-6 w-full max-w-md text-center">
          <img
            src={profile}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {userData.name || "User"}
          </h2>
          <p className="text-gray-500">User hai bhai user hai</p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="flex items-center gap-2 !bg-indigo-500 text-white px-4 py-2 rounded-full shadow !hover:bg-indigo-600 transition"
              onClick={() => setIsUpdated(!isUpdated)}
            >
              <FaUserEdit /> Edit Profile
            </button>
            <button
              className="flex items-center gap-2 !bg-gray-300 !text-gray-800 px-4 py-2 rounded-full shadow !hover:bg-gray-400 transition"
              onClick={handleDeleteProfile}
            >
              <FaCog /> Delete Profile
            </button>
          </div>
        </div>

        {/* Data Visualization */}
        <div className="w-full h-xl mt-5 text-black p-2 bg-white rounded-lg">
          <h1 className="text-center">Data Visualization</h1>
          <Bar
            data={{
              labels: ["A", "B", "C"],
              datasets: [
                {
                  label: "Good",
                  data: [200, 300, 400],
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
                {
                  label: "Bad",
                  data: [100, 150, 300],
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
