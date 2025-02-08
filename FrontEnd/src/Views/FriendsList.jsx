import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../Context/AuthContext";
import "../Styles/FriendsList.css"

const FriendsList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = UseAuthContext();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = auth.id;
  let navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/friends/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setUsers(data.friends || []);
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
      const res = await fetch("http://localhost:8000/api/friends/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, friendId }),
      });
      const data = await res.json();
      alert(data.message);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== friendId)
      );
    } catch (err) {
      console.error(
        "Error removing friend:",
        err.response ? err.response.data : err.message
      );
      alert("Failed to remove friend.");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="friends-list-container">
      <h2 className="friends-title">Your Friends</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="friends-content">
        {users.length > 0 ? (
          <div className="friends-grid">
            {users.map((user) => (
              <div key={user._id} className="friend-card">
                <span className="friend-name">{user.name}</span>
                <div className="friend-actions">
                  <button
                    className="action-button btn-color"
                    onClick={() =>
                      navigate("/app/chat", {
                        state: { friendId: user._id, friendName: user.name },
                      })
                    }
                  >
                    Chat
                  </button>
                  <button
                    className="action-button btn-color-r"
                    onClick={() => removeFriend(user._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-friends-message">
            No friends found. Add some friends to get started!
          </div>
        )}
      </div>
      <style>{`
        .friends-list-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .friends-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #fff;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          color: #e74c3c;
          text-align: center;
          margin-bottom: 1rem;
          padding: 0.5rem;
          background-color: #fde8e8;
          border-radius: 4px;
        }

        .friends-grid {
          display: grid;
          gap: 1rem;
        }

        .friend-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s ease;
        }

        .friend-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .friend-name {
          font-size: 1.1rem;
          font-weight: 500;
          color: #2d3748;
        }

        .friend-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }

        .chat-button {
          background-color: #3498db;
          color: white;
        }

        .chat-button:hover {
          background-color: #2980b9;
        }

        .remove-button {
          background-color: #e74c3c;
          color: white;
        }

        .remove-button:hover {
          background-color: #c0392b;
        }

        .no-friends-message {
          text-align: center;
          color: #718096;
          padding: 2rem;
          background-color: #f8f9fa;
          border-radius: 8px;
          font-size: 1.1rem;
        }

        @media (max-width: 640px) {
          .friend-card {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .friends-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FriendsList;
