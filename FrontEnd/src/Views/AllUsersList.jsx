import { useState, useEffect } from "react";
import axios from "axios";

function AllUsersList() {
    const [User, setUser] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/user/allusers", {
                    withCredentials: true,
                });
                console.log(res);
                setUser(res.data.users || []); // Assuming the API returns { User: [...] }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <p>All Users List</p>
            <ul>
                {User.length >= 0 ? (
                    User.map((friend, index) => (
                        <li key={index}>{friend.name}</li>
                    ))
                ) : (
                    <p>No User found.</p>
                )}
            </ul>
        </div>
    );
}

export default AllUsersList;
