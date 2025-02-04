import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { addUser } from "../Features/User/UserSlice";

const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const googleAuthUrl = "http://localhost:8000/api/auth/google"; // Ensure this matches your backend URL

  const authenticate = useCallback(() => {
    // Open the popup for Google login
    const popup = window.open(googleAuthUrl, "_blank", "width=500,height=600");

    // Listen for the message from the popup window once it's completed
    const handleMessage = (event) => {
      // Ensure the message is coming from the expected origin
      if (event.origin !== "http://localhost:8000") return; // Update this if your frontend and backend are on different ports

      // Handle Google login result
      if (event.data.error) {
        console.error("Google Authentication Failed:", event.data.error);
      } else if (event.data.token) {
        // Store JWT in localStorage or handle it however you prefer
        localStorage.setItem("jwt", event.data.token);

        // Dispatch user data to the Redux store (or another state management)
        const newUser = {
          id: event.data.user.userId,
          name: event.data.user.name,
          email: event.data.user.email,
        };
        dispatch(addUser(newUser));

        // Redirect to home or dashboard page
        window.location.href = "/app/home"; // Adjust URL to match your frontend route
        console.log("User logged in successfully:", event.data.user);
      }
    };

    // Set up the message event listener
    window.addEventListener("message", handleMessage, { once: true });

    // Cleanup event listener after the popup is closed or when component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [dispatch, googleAuthUrl]);

  return authenticate;
};

export default useGoogleAuth;
