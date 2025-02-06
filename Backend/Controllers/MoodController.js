import Mood from '../Models/mood.js';

export const submitMood = async (req, res) => {
    try {
        const {mood} = req.body;
        const userId = req.user._id;
        const existingMood = await Mood.findOne({user : userId, date : new Date().setHours(0,0,0,0)});
        if(existingMood)
            return res.status(400).json({message : "Today's mood already submited"});
        const newMood = new Mood({user : userId, mood});
        await newMood.save();
        res.status(200).json({message : "Today's mood submited"});
    } catch (error) {
        console.log("Error submitting mood", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMood = async (req, res) => {
    try {
        const userId = req.user._id;
        const moodData = await Mood.find({user : userId}).sort({date : 1});
        res.status(200).json({message : "successs", moodData});
    } catch (error) {
        console.log("Error getting mood", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}