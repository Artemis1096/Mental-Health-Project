import Journal from '../Models/journal.js';
import User from "../Models/User.js";

/**
 * Adds a new journal entry for a user.
 */
export const addJournal = async (req, res) => {
    try {
        // Extract title, content, and userId from request body
        const { title, content, userId } = req.body;

        // Validate required fields
        if (!title || !content || !userId)
            return res.status(400).json({ message: "Missing fields" });

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });

        // Create a new journal entry and save it to the database
        const newJournal = new Journal({ title, content, user: userId });
        await newJournal.save();

        res.status(200).json({ message: "Journal added successfully", journal: newJournal });
    } catch (error) {
        console.log("Error adding journal:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Retrieves all journal entries of a specific user.
 */
export const getJournals = async (req, res) => {
    try {
        const { id } = req.params; // ID of the user whose journals are to be fetched

        // Check if the user exists
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });

        // Retrieve journals related to the user, sorted by creation date (newest first)
        const journals = await Journal.find({ user: id }).sort({ createdAt: -1 });

        res.status(200).json({ message: "Success", journals });
    } catch (error) {
        console.log("Error getting journals:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Deletes a specific journal entry.
 */
export const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params; // ID of the journal to be deleted

        // Attempt to find and delete the journal entry
        const journal = await Journal.findByIdAndDelete(id);
        if (!journal)
            return res.status(404).json({ message: "Journal not found" });

        res.status(200).json({ message: "Journal deleted successfully" });
    } catch (error) {
        console.log("Error deleting journal:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
