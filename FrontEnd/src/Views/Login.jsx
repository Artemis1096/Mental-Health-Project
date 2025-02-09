import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Features/User/UserSlice";
import { UseAuthContext } from "../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

import bg from "../Assets/signUpbg.jpg";
import axios from "axios";
import useGoogleAuth from "../Hooks/useGoogleAuthentication";

//Please add comment when adding or fixing anything in the code.

function Login() {
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticate = useGoogleAuth();

  const notifyError = (label) => toast.error(label);
  const notifySuccess = (label) => toast.success(label);

  const { setAuth } = UseAuthContext();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!password) {
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
          { username, email, password },
          { withCredentials: true }
        );

        const newUser = {
          id: res.data.userId,
          name: res.data.name,
          email: res.data.email,
          userType: res.data.userType,
        };
        notifySuccess(res.data.message);
        setTimeout(() => {
          dispatch(addUser(newUser));

          setAuth(newUser);
        }, 2000);
      } catch (error) {
        notifyError(error.response.data.error || error.response.data.message);

        if (
          error.response?.data.message ===
          "Account not verified, verify OTP and then try logging in!"
        ) {
          navigate("/register");
        }
      } finally {
        setIsSubmitted(false);
      }
    };

    fetchData();
  }, [isSubmitted]);

  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen ">
        <img
          src={bg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        {/* Login Form */}
        <div className="absolute bg-purple-200 p-8 rounded-2xl shadow-lg w-96 z-10 opacity-80">
          <Toaster />
          <h1 className="text-5xl font-bold text-center mb-6 text-black permanent-marker-regular ">
            Login
          </h1>

          <form
            className="space-y-4"
            onSubmit={handleSubmitLogin}
            autoComplete="off"
          >
            <div className=" shadow-lg bg-amber-400 opacity-100  p-2 rounded-2xl">
              <div>
                <label className="block text-black font-medium mb-1 rounded-md">
                  Enter your Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <h1 className="text-black text-center opacity-55 bg-amber-300 rounded-full mt-3">
                  OR
                </h1>
              </div>
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
                />
              </div>
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
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="w-full !bg-orange-900 hover:!bg-orange-700 !text-white py-2 rounded-lg font-semibold transition"
            >
              {" "}
              Login{" "}
            </button>
          </form>

          <div className="text-center text-black mt-4">OR</div>

          <button onClick={authenticate} className="w-full yoyo  ">
            <div className="my-3">
              <FaGoogle />
            </div>
          </button>

          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account?{" "}
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
