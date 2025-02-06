import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Features/User/UserSlice";

import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import Button from "../Components/Button";
import BackgroundVideo from "../Components/LoginPage/BackgroundVideo";

import useGoogleAuth from "../Hooks/useGoogleAuthentication";
import { UseAuthContext } from "../Context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {setAuth} = UseAuthContext();

  const authenticate = useGoogleAuth();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!isSubmitted) return;

    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/login",
          { email, password },
          { withCredentials: true }
        );

        console.log(res);

        if (res.data.message === "Logged in successfully") {
          navigate("/app/home");
          const newUser = {
            id: res.data.userId,
            name: res.data.name,
            email: res.data.email,
            userType : res.data.userType
          };

          dispatch(addUser(newUser));
          setAuth(newUser);
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
      } finally {
        setIsSubmitted(false);
      }
    };

    fetchData();
  }, [isSubmitted]);

  // const handleGoogleLogin = () => {
  //   authenticate();
  // };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-amber-100">
      {/* Background Video */}
      <BackgroundVideo />

      {/* Login Form */}
      <div className="absolute bg-amber-200 p-8 rounded-2xl shadow-lg w-96 z-10 opacity-70">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 permanent-marker-regular ">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmitLogin}>
          <div>
            <label className="block text-black font-medium mb-1 rounded-md">
              Enter your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-black font-medium mb-1">
              Enter your Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button
            label="Login"
            type="submit"
            className="w-full !bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          />
        </form>

        <div className="text-center text-black mt-4">OR</div>

        <button onClick={authenticate} className="w-full yoyo  ">
          <div className="my-3">
            <FaGoogle />
          </div>
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
