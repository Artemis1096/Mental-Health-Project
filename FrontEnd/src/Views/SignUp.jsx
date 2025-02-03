import Register from "../Components/Register";
import { Link } from "react-router";
import { FaGoogle } from "react-icons/fa";

import useGoogleAuth from "../Hooks/useGoogleAuthentication";

function SignUp() {
  const authenticate = useGoogleAuth();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>
        <Register />
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
          <button
            onClick={authenticate}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            <FaGoogle />
            Continue with Google
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
