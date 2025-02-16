import "../Styles/FriendsList.css"; // Importing CSS for styling

import { useState, useEffect } from "react"; // Importing necessary React hooks

import axios from "axios";
import Loader from "../Components/Loader"; // Importing Loader component

// Please add a comment when adding or fixing anything in the code.

function AllUsersList() {
  // State for storing user data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [friendRequests, setFriendRequests] = useState([]); // State for friend requests
  const [searchQuery, setSearchQuery] = useState(""); // State for search functionality

  const userData = JSON.parse(localStorage.getItem("user")); // Retrieving user data from localStorage
  const userId = userData?.id; // Extracting user ID

  useEffect(() => {
    // Function to fetch all users
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users", {
          withCredentials: true, // Ensuring cookies are sent with the request
        });
        setUsers(res.data.data || []);
        console.log(res.data.data);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    // Function to fetch pending friend requests
    const fetchFriendRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/friends/pending/${userId}`,
          { withCredentials: true }
        );
        setFriendRequests(res.data.pendingRequests || []);
        console.log(res.data.pendingRequests);
      } catch (err) {
        console.error("Error fetching friend requests:", err);
      }
    };

    if (userId) {
      fetchUsers();
      fetchFriendRequests();
    }
  }, [userId]);

  // Function to send a friend request
  const sendFriendRequest = async (receiverId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/friends/sendrequest",
        { sender: userId, receiver: receiverId },
        { withCredentials: true }
      );
      alert(res.data.message);
    } catch (err) {
      alert("Friend request already sent.");
    }
  };

  // Function to accept a friend request
  const acceptFriendRequest = async (requestId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/friends/acceptrequest/${requestId}`,
        {},
        { withCredentials: true }
      );
      alert(res.data.message);
      // Removing the accepted request from the list
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      alert("Failed to accept the friend request.");
    }
  };

  // Function to decline a friend request
  const declineFriendRequest = async (requestId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/friends/rejectrequest/${requestId}`,
        { withCredentials: true }
      );
      alert(res.data.message);
      // Removing the declined request from the list
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      alert("Failed to decline the friend request.");
    }
  };

  // Filtering users based on search query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loader />; // Show loader while fetching data
  if (error) return <p className="text-center text-red-600">{error}</p>; // Show error message if fetching fails

  return (
    <div className="p-4 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 dark:from-black dark:via-purple-950 h-full dark:to-black">
      <h1 className="text-center text-5xl py-5">Find Your Soulmates</h1>

      {/* Main Container */}
      <div className="flex gap-6 h-vh friend-main-container shadow-2xl border-1 rounded-xl p-6">
        {/* Users List */}
        <div className="w-1/2 bg-white p-5 rounded-lg shadow-md">
          {/* Search Bar */}
          <div className="w-full flex border-1 rounded-lg text-b !border-purple-500 justify-center mb-4">
            <h1 className="text-4xl">🔍</h1>
            <input
              type="search"
              className="w-96 p-3 border rounded-md text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <h1 className="text-4xl">🔍</h1>
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            All Users
          </h2>
          <div className="h-80 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              <ul>
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded-lg shadow-sm"
                  >
                    <span className="text-gray-700 font-medium">
                      {user.username}
                    </span>
                    <button
                      className="px-3 py-1 btn-color text-white rounded-md !hover:bg-purple-700 transition"
                      onClick={() => sendFriendRequest(user._id)}
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No users found.</p>
            )}
          </div>
        </div>

        {/* Friend Requests List */}
        <div className="w-1/2 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Friend Requests
          </h2>
          <div className="h-80 overflow-y-auto">
            {friendRequests.length > 0 ? (
              <ul>
                {friendRequests.map((request) => (
                  <li
                    key={request._id}
                    className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded-lg shadow-sm"
                  >
                    <span className="text-gray-700">
                      {request.user1.username} sent a request
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 !bg-green-600 text-white rounded-md hover:!bg-green-700 transition"
                        onClick={() => acceptFriendRequest(request._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1 !bg-red-600 text-white rounded-md hover:!bg-red-700 transition"
                        onClick={() => declineFriendRequest(request._id)}
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No pending requests.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsersList;
