import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/FriendsList.css";
function AllUsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]); // Store friend requests

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.id;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users", {
          withCredentials: true,
        });
        setUsers(res.data.data || []);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/friends/pending/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        setFriendRequests(res.data.pendingRequests || []);
      } catch (err) {
        console.error("Error fetching friend requests:", err);
      }
    };

    if (userId) {
      fetchUsers();
      fetchFriendRequests();
    }
  }, [userId]);

  const sendFriendRequest = async (receiverId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/friends/sendrequest",
        {
          sender: userId,
          receiver: receiverId,
        },
        { withCredentials: true }
      );
      alert(res.data.message);
    } catch (err) {
      console.error("Error sending friend request:", err);
      alert("Friend request already sent.");
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/friends/acceptrequest/${requestId}`,
        {}, // Add request body if needed
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(res.data.message);

      // Ensure state updates correctly
      setFriendRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );
    } catch (err) {
      console.error(
        "Error accepting friend request:",
        err.response ? err.response.data : err.message
      );
      alert(
        err.response?.data?.message || "Failed to accept the friend request."
      );
    }
  };

  const declineFriendRequest = async (requestId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/friends/rejectrequest/${requestId}`,
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

      // Update state to remove the declined request
      setFriendRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );
    } catch (err) {
      console.error(
        "Error declining friend request:",
        err.response ? err.response.data : err.message
      );
      alert(
        err.response?.data?.message || "Failed to decline the friend request."
      );
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="main-container flex">
        <div className="AllUsersList">
          <h2 className="text-center text-4xl m-3">All Users List</h2>
          <div className="friend-container ml-10">
            {users.length > 0 ? (
              <ul>
                {users.map((user) => (
                  <li key={user._id}>
                    <div className="addFriend flex justify-between">
                      <label className="user-name">{user.name}</label>
                      <button
                        className="f-btn"
                        onClick={() => sendFriendRequest(user._id)}
                      >
                        Add
                      </button>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
        <div className="requestList">
          <h2 className="text-center text-4xl m-3">Friend Requests</h2>
          <div className="friend-container ml-10">
            {friendRequests.length > 0 ? (
              <ul>
                {friendRequests.map((request) => (
                  <li key={request._id}>
                    <div className="acceptFriend flex justify-between">
                      <label className="user-name">
                        {request.user1.name} sent you a friend request
                      </label>
                      <button
                        className="f-btn"
                        onClick={() => acceptFriendRequest(request._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="f-btn"
                        onClick={() => declineFriendRequest(request._id)}
                      >
                        Decline
                      </button>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <label className="user-name">No pending friend requests.</label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsersList;
