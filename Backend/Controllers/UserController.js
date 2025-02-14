import mongoose from "mongoose";
import User from "../Models/User.js";
import Friendship from "../Models/friendship.js";
import Article from "../Models/article.js";
import Mood from "../Models/mood.js";
import Conversation from "../Models/conversation.js";
import Message from '../Models/message.js';
import Task from "../Models/task.js";
import Journal from "../Models/journal.js";

// returns the list of all users except the current user
export const getUsers = async (req, res) => {
  try {
    const id = req.user._id;

    // Fetch all friendships involving the current user
    const friendships = await Friendship.find({
      $or: [{ user1: id }, { user2: id }],
      status: "accepted",
    });

    // Extract friend IDs
    const friendIds = friendships.map((friendship) => 
      friendship.user1.equals(id) ? friendship.user2 : friendship.user1
    );

    // Fetch users who are not the current user and not friends
    const users = await User.find({
      _id: { $nin: [...friendIds, id] }, // Exclude friends and the current user
      userType: { $ne: "admin" },
      isVerified: true,
    }).select("-password");

    res.status(200).json({ message: "success", data: users });
  } catch (error) {
    console.error("Error getting users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// returns all details of a specific user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    console.log("error getting user information", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Logged-in user ID
    const { name, DOB, username } = req.body;

    // Convert DOB from "DD-MM-YYYY" to a valid Date object
    let formattedDOB;
    if (DOB) {
      const parts = DOB.split("-");
      if (parts.length === 3) {
        const [year, month, day] = parts.map(Number);
        formattedDOB = new Date(year, month - 1, day); // month is 0-based
      }
    }

    // Validate DOB
    if (formattedDOB && isNaN(formattedDOB.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid date format" });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, DOB: formattedDOB, username },
      { new: true, runValidators: true }
    ).select("name DOB username");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const deleteProfile = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const userId = req.user._id; // Logged-in user ID
    session.startTransaction();

    await Friendship.deleteMany({
      $or: [{ user1: userId }, { user2: userId }]
    }).session(session);

    await Article.updateMany(
      {likes : userId},
      { $pull: { likes: userId } }
    ).session(session);

    await Mood.deleteMany({user : userId}).session(session);

    await Message.deleteMany({
      $or: [{ senderid: userId }, { receiverid: userId }]
    }).session(session);

    await Conversation.deleteMany({
      participants : userId
    }).session(session);

    await Task.deleteMany({user : userId}).session(session);

    await Journal.deleteMany({user : userId}).session(session);

    await User.findByIdAndDelete(userId).session(session);

    await session.commitTransaction();

    res.status(200).json({message : "user deleted successfully"});

  } catch (error) {
    await session.abortTransaction();
    console.error("Error deleting profile:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }finally{
    session.endSession();
  }
};
