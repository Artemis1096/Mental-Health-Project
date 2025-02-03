import { useState, useEffect } from "react";
import axios from "axios";

function AllUsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]); // Store friend requests

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData && Array.isArray(userData) ? userData[0].id : null;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/users", { withCredentials: true });
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
                const res = await axios.get(`http://localhost:8000/api/friends/pending/${userId}`, {
                    withCredentials: true,
                });
                setFriendRequests(res.data.requests || []);
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
            const res = await axios.post(
                `http://localhost:8000/api/friends/acceptrequest/${requestId}`,
                {},
                { withCredentials: true }
            );
            alert(res.data.message);
            setFriendRequests(friendRequests.filter((req) => req._id !== requestId)); // Remove accepted request from list
        } catch (err) {
            console.error("Error accepting friend request:", err);
            alert("Failed to accept the friend request.");
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-center">All Users List</h2>
            <div className="friend-list ml-10">
                {users.length > 0 ? (
                    <ul>
                        {users.map((user) => (
                            <li key={user._id}>
                                <div className="addFriend flex justify-between">
                                    {user.name}
                                    <button className="btn" onClick={() => sendFriendRequest(user._id)}>Add</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}
            </div>

            <h2 className="text-center mt-6">Friend Requests</h2>
            <div className="friend-requests ml-10">
                {friendRequests.length > 0 ? (
                    <ul>
                        {friendRequests.map((request) => (
                            <li key={request._id}>
                                <div className="acceptFriend flex justify-between">
                                    {request.sender.name} sent you a friend request
                                    <button className="btn" onClick={() => acceptFriendRequest(request._id)}>Accept</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending friend requests.</p>
                )}
            </div>
        </div>
    );
}

export default AllUsersList;
