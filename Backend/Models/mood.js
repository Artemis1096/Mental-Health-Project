import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mood: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0),
    // unique : true
  },
});

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;
