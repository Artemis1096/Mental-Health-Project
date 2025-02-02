import Friendship from '../Models/friendship.js';
import User from '../Models/User.js';

export const sendFriendRequest = async (req, res) => {
    try {
        const {sender, receiver} = req.body;

        const user1 = await User.findById(sender);
        const user2 = await User.findById(receiver);

        if(!user1 || !user2){
            return res.status(404).json({message : "Sender or receiver not found! Can't send friend request"});
        }

        const existingFriendship = await Friendship.findOne({
            $or: [
                { user1: sender, user2: receiver },
                { user1: receiver, user2: sender }
            ]
        });

        if (existingFriendship) {
            return res.status(400).json({ message: "Friend request already exists!" });
        }


        const newFriendship = new Friendship({
            user1 : sender,
            user2 : receiver,
            status : "pending"
        });

        await newFriendship.save();

        res.status(200).json({message : "friend request sent"});

    } catch (error) {
        console.log("Error in adding friend", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const {id} = req.parms;

        const request = await Friendship.findById(id);
        if(!request)
            return res.status(404).json({message : "request not found"});

        if (request.status !== "pending")
            return res.status(400).json({ message: "This request is not pending!" });

        const updatedRequest = await Friendship.findByIdAndUpdate(
            id,
            { $set: { status: "accepted" } },
            { new: true }
        );

        res.status(200).json({message : "friend request accepted"});
    } catch (error) {
        console.log("Error in accepting request", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

export const rejectFriendRequest = async (req, res) => {
    try {
        const {id} = req.params;
        
        const request = await Friendship.findById(id);

        if(!request)
            return res.status(404).json({message : "Friend request not found"});
    
        if(request.status !== "pending")
            return res.status(400).json({message : "only pending requests can be rejected"});

        await Friendship.findByIdAndDelete(id);

        res.status(200).json({message : "Friend request rejected"});
    } catch (error) {
        console.log("Error rejecting request", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

export const removeFriend = async (req, res) => {
    try {
        const {userId, friendId} = req.body;

        const user1 = await User.findById(userId);
        const user2 = await User.findById(friendId);
        if(!user1 || !user2)
            return res.status(404).json({message : "user not found"});

        const deletedFriendship = await Friendship.findOneAndDelete({
            $or : [
                {user1 : userId, user2 : friendId, status:"accepted"},
                {user1 : friendId, user2 : userId, status:"accepted"}
            ]
        })

        if(!deletedFriendship)
            return res.status(404).json({message : "friendship not found"});

        res.status(200).json({message : "Friend removed successfully"});

    } catch (error) {
        console.log("Error removing friend", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

export const getFriendsList = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        if(!user)
            return res.status(404).json({message : "user not found"});

        const friendships = await Friendship.find({
            $or : [
                {user1 : id, status : "accepted"},
                {user2 : id, status : "accepted"}
            ]
        }).populate("user1 user2", "name email");

        const friends = friendships.map(friendship => 
            friendship.user1._id.toString()===id ? 
            friendship.user2 :
            friendship.user1
        )

        res.status(200).json({message : "Success", friends});

    } catch (error) {
        console.log("Error getting friends", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}

export const pendingRequests = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user)
            return res.status(404).json({message : "user not found"});
        const pendingRequests = await Friendship.find({
            user2 : id, status : "pending"
        }).populate("user1", "name email");
        res.status(200).json({message : "Success", pendingRequests});
    } catch (error) {
        console.log("Error getting pending requests", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}