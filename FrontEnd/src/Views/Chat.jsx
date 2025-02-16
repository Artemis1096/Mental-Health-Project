import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Chat.css";
import axios from "axios";
import useListenMessages from "../Hooks/useListenMessages.js";

const Chat = () => {
  const location = useLocation();
  const friendId = location.state?.friendId; // Get friend's ID from route state
  const friendName = location.state?.friendName; // Get friend's name from route state
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(""); // Store new message input
  const chatEndRef = useRef(null); // Ref for auto-scrolling to latest message
  const userData = JSON.parse(localStorage.getItem("user")); // Get current user data from local storage
  const userId = userData.id; // Extract user ID from stored user data

  useListenMessages({ messages, setMessages }); // Custom hook to listen for new messages

  useEffect(() => {
    if (!friendId) return; // If no friend ID is available, exit early

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
          setMessages(res.data.messages); // Update state with fetched messages
        } else {
          console.error("No messages found in response", res.data);
        }
      } catch (error) {
        console.error(
          "Error fetching messages:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchMessages();
  }, [friendId]); // Fetch messages when friendId changes

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Auto-scroll to the latest message
  }, [messages]); // Runs whenever messages update

  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const messageData = {
      message: newMessage, // Send only the message text
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
        setMessages((prev) => [...prev, res.data.newmessage]); // Append new message to chat
        setNewMessage(""); // Clear input field
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      sendMessage(); // Send message when Enter is pressed
    }
  };

  return (
    <div className="h-full">
      <div className="Chat-container flex flex-col">
        {/* Display friend's name at the top */}
        <div className="Receiver-Name w-14 flex-none">{friendName}</div>

        {/* Chat messages section */}
        <div className="chat-area w-64 flex-auto overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.senderid === userId ? "sent" : "received"
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={chatEndRef} /> {/* Auto-scroll anchor */}
        </div>

        {/* Message input field and send button */}
        <div className="send-message w-14 flex-none flex">
          <input
            type="text"
            className="message-input flex-auto"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
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
