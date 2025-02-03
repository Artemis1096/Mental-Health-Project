import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios'

const FriendsList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData && Array.isArray(userData) ? userData[0].id : null;
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/friends/${userId}`, { withCredentials: true });
            console.log(res);
            setUsers(res.data.friends || []);
        } catch (err) {
            setError("Failed to fetch users.");
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };
    if (userId) {
        fetchUsers();
    }
}, [userId]);

const removeFriend = async (friendId) => {
  try {
      const res = await axios.post(
          "http://localhost:8000/api/friends/remove",
          {
            userId,
            friendId,
          }, 
          {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
          }
      );

      alert(res.data.message);

      // Remove the friend from the UI
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== friendId));
  } catch (err) {
      console.error("Error removing friend:", err.response ? err.response.data : err.message);
      alert(err.response?.data?.message || "Failed to remove friend.");
  }
};

  
  return (
    <div>
      <h2 className="text-center">Your Friends</h2>
            <div className="friend-list ml-10">
                {users.length > 0 ? (
                    <ul>
                        {users.map((user) => (
                            <li key={user._id}>
                                <div className="flex justify-between">
                                    {user.name}
                                    <button className="btn" onClick={() => removeFriend(user._id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
    </div>
  )
}

export default FriendsList