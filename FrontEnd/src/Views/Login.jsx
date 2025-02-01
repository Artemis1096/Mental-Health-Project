import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Features/User/UserSlice";

import axios from "axios";
import Button from "../Components/Button";
import NavBar from "../Components/NavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false); //to check if form is submitted
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle login submission
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    let length = password.length;
    if (length < 6) {
      alert("Password should be atleast 6 characters long");
      return;
    }
    setIsSubmitted(true);
    // Mark that login is being attempted
  };

  // UseEffect for making the login API call
  useEffect(() => {
    if (!isSubmitted) return;

    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/login",
          {
            email,
            password,
          },
          { withCredentials: true },
          {
            Headers: { "content-type": "application/json" },
          }
        );

        // If login is successful, move to OTP submission
        console.log("Login successful:", res);
        if (res.data.message === "Logged in successfully") {
          navigate("/app");
          const newUser = {
            id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
          };

          console.log(newUser);

          dispatch(addUser(newUser));
        }

        // Assume backend responds to trigger OTP (this step depends on your backend logic)
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
      } finally {
        setIsSubmitted(false);
      }
    };

    fetchData();
  }, [isSubmitted]); // This useEffect triggers on login submission

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login
          </h1>

          <form className="space-y-4" onSubmit={handleSubmitLogin}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Enter your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Enter your Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button
              label="Login"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            />
          </form>

          <p className="mt-4 text-center text-gray-600">
            Dont have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
