import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import "../Styles/FriendsList.css"
import { useNavigate } from "react-router-dom"

const FriendsList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData && Array.isArray(userData) ? userData[0].id : null;
    let navigate = useNavigate();
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
            <h2 className="text-center text-4xl m-3">Your Friends</h2>
            <div className="friend-container ml-10 mt-2">
                {users.length > 0 ? (
                    <ul className='friends-list'>
                        {users.map((user) => (
                            <li key={user._id}>
                                <div className="flex justify-between">
                                    <label className="user-name">{user.name}</label>
                                    <div className="btns">
                                        <button
                                            className="f-btn"
                                            onClick={() => navigate("/app/chat", { state: { friendId: user._id , friendName: user.name} })}
                                        >
                                            Chat
                                        </button>
                                        <button className="f-btn" onClick={() => removeFriend(user._id)}>Remove</button>
                                    </div>
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
    )
}

export default FriendsList