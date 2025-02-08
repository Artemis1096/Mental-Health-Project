import Friendship from "../Models/friendship.js";
import User from "../Models/User.js";

/**
 * Sends a friend request from one user to another.
 */
export const sendFriendRequest = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    // Check if both sender and receiver exist in the database
    const user1 = await User.findById(sender);
    const user2 = await User.findById(receiver);

    if (!user1 || !user2) {
      return res
        .status(404)
        .json({
          message: "Sender or receiver not found! Can't send friend request",
        });
    }

    // Check if a friendship request already exists between these users
    const existingFriendship = await Friendship.findOne({
      $or: [
        { user1: sender, user2: receiver },
        { user1: receiver, user2: sender },
      ],
    });

    if (existingFriendship) {
      return res
        .status(400)
        .json({ message: "Friend request already exists!" });
    }

    // Create a new friend request with "pending" status
    const newFriendship = new Friendship({
      user1: sender,
      user2: receiver,
      status: "pending",
    });

    await newFriendship.save();

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    console.log("Error in sending friend request", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Accepts a pending friend request.
 */
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params; // Fix: Corrected "req.parms" to "req.params"

    // Find the friend request by ID
    const request = await Friendship.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Ensure the request is still pending before accepting
    if (request.status !== "pending") {
      return res.status(400).json({ message: "This request is not pending!" });
    }

    // Update the friendship status to "accepted"
    await Friendship.findByIdAndUpdate(
      id,
      { $set: { status: "accepted" } },
      { new: true }
    );

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in accepting request", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Rejects a pending friend request.
 */
export const rejectFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the friend request by ID
    const request = await Friendship.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Ensure only pending requests can be rejected
    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be rejected" });
    }

    // Delete the friend request
    await Friendship.findByIdAndDelete(id);

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.log("Error rejecting request", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Removes an existing friend from the user's friend list.
 */
export const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Check if both users exist
    const user1 = await User.findById(userId);
    const user2 = await User.findById(friendId);
    if (!user1 || !user2) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the friendship record if it exists
    const deletedFriendship = await Friendship.findOneAndDelete({
      $or: [
        { user1: userId, user2: friendId, status: "accepted" },
        { user1: friendId, user2: userId, status: "accepted" },
      ],
    });

    if (!deletedFriendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.log("Error removing friend", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const deleteAll = async(req, res) => {
//     try {
//         const userId = req.user._id;
//         const deletedFriendships = await Friendship.deleteMany({
//             $or: [{user1 : userId}, {user2 : userId}]
//         });
//         res.status(200).json({ message: "All assocaited friendships deleted successfully" });
//     } catch (error) {
//         console.log("error deleting associated friendships", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

/**
 * Retrieves the list of friends for a given user.
 */
export const getFriendsList = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all accepted friendships where the user is involved
    const friendships = await Friendship.find({
      $or: [
        { user1: id, status: "accepted" },
        { user2: id, status: "accepted" },
      ],
    }).populate("user1 user2", "name email");

    // Extract and format the list of friends
    const friends = friendships.map((friendship) =>
      friendship.user1._id.toString() === id
        ? friendship.user2
        : friendship.user1
    );

    res.status(200).json({ message: "Success", friends });
  } catch (error) {
    console.log("Error retrieving friends list", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Retrieves all pending friend requests for a given user.
 */
export const pendingRequests = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all pending friend requests where the user is the receiver
    const pendingRequests = await Friendship.find({
      user2: id,
      status: "pending",
    }).populate("user1", "name email username");

    res.status(200).json({ message: "Success", pendingRequests });
  } catch (error) {
    console.log("Error retrieving pending requests", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
