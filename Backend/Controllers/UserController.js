import User from "../Models/User.js";


// returns the list of all users except the current user
export const getUsers = async (req, res) => {
    try {
        const { id } = req.params; // Extract the user ID from request parameters
        const users = await User.find({ 
            _id: { $ne: id }, 
            userType :{$ne : "admin"} 
        }).select("-password"); // Exclude the given ID & password field

        res.status(200).json({ message: "success", data: users });
    } catch (error) {
        console.error("Error getting users:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// returns all details of a specific user
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select("-password");
        if(!user)
            return res.status(404).json({message : "user not found"});
        res.status(200).json({
            message: "success",
            data: user
        })
    } catch (error) {
        console.log("error getting user information", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}