import mongoose, { mongo } from 'mongoose';

const friendshipSchema = new mongoose.Schema({
    user1: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    user2: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'blocked'],
        default: 'pending'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Friendship = mongoose.model("Friendship", friendshipSchema);

export default Friendship;