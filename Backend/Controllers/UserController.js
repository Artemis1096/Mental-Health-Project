import User from "../Models/User.js";


// returns the list of all users except the current user
export const getUsers = async (req, res) => {
    try {
        // const { id } = req.params; // Extract the user ID from request parameters
        const id = req.user._id;
        const users = await User.find({ 
            _id: { $ne: id }, 
            userType :{$ne : "admin"},
            isVerified : true
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

export const editProfile = async (req, res) => {
    try {
      const userId = req.user._id; // Logged-in user ID
      const { name, DOB, username } = req.body;
  
      // Convert DOB from "DD-MM-YYYY" to a valid Date object
      let formattedDOB;
      if (DOB) {
        const [day, month, year] = DOB.split("-");
        formattedDOB = new Date(`${year}-${month}-${day}`); // Convert to "YYYY-MM-DD"
      }
  
      // Update user profile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, DOB: formattedDOB, username},
        { new: true, runValidators: true }
      ).select("name DOB");
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  };


  export const deleteProfile = async (req, res) => {
    try {
      const userId = req.user._id; // Logged-in user ID
  
      // Delete user profile
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({
        success: true,
        message: "Profile deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting profile:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  };