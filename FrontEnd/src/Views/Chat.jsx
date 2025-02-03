import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Chat.css";
import axios from "axios";

const Chat = () => {
    const location = useLocation();
    const friendId = location.state?.friendId;
    const friendName = location.state?.friendName;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null); // Ref for auto-scrolling
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData && Array.isArray(userData) ? userData[0].id : null;

    useEffect(() => {
        if (!friendId) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/message/get/${friendId}`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                if (res.data && res.data.messages) {
                    setMessages(res.data.messages);
                } else {
                    console.error("No messages found in response", res.data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error.response ? error.response.data : error.message);
            }
        };

        fetchMessages();
    }, [friendId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]); // Auto-scroll when messages update

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            message: newMessage,
        };

        try {
            const res = await axios.post(
                `http://localhost:8000/api/message/send/${friendId}`,
                messageData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setMessages((prev) => [...prev, res.data.newmessage]);
                setNewMessage("");
            }
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <div className="h-full">
            <div className="Chat-container flex flex-col">
                <div className="Receiver-Name w-14 flex-none">{friendName}</div>
                <div className="chat-area w-64 flex-auto overflow-y-scroll">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.senderid === userId ? "sent" : "received"}`}
                        >
                            {msg.message}
                        </div>
                    ))}
                    <div ref={chatEndRef} /> {/* Auto-scroll anchor */}
                </div>
                <div className="send-message w-14 flex-none flex">
                    <input
                        type="text"
                        className="message-input flex-auto"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button className="send-button flex-none" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;