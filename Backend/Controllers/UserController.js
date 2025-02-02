import mongoose from 'mongoose'
import Conversation from "../Models/conversation.js";
import User from "../Models/User.js";

export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;


    const conversations = await Conversation.find({
      participants: userId,
    }).select("participants");


    const friendIds = new Set();
    conversations.forEach((conv) => {
      conv.participants.forEach((id) => {
        if (id.toString() !== userId.toString()) {
          friendIds.add(id.toString());
        }
      });
    });

    const friends = await User.find({ _id: { $in: [...friendIds] } }).select(
      "name email "
    );

    res.status(200).json({
      success: true,
      friends,
    });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};





export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id; 

  
    const users = await User.find({ _id: { $ne: userId } }).select("name email ");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
