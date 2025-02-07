import Register from "../Components/Register";
import { Link } from "react-router-dom"; // Fixed import
import { FaGoogle } from "react-icons/fa";
import bg from "../Assets/signUpbg.jpg";
import useGoogleAuth from "../Hooks/useGoogleAuthentication";

function SignUp() {
  const authenticate = useGoogleAuth();

  return (
    <div className="relative h-screen  overflow-y-auto flex items-center justify-center min-h-screen pl-16 ">
      {/* Background Image */}
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* SignUp Card (Shifted Left, Smaller) */}
      <div className=" w-full max-w-sm m-10 p-6 mb-5 bg-purple-300 shadow-lg rounded-xl z-10 opacity-70">
        <h2 className="text-2xl bg-purple-800 rounded-3xl font-bold text-center text-white mb-4 py-1 ">
          ✨ Sign Up ✨
        </h2>
        <Register />

        <p className="mt-4 text-center text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>

        <h2 className="text-black  text-center p-1">OR</h2>

        <button
          onClick={authenticate}
          className="w-full mt-4 rounded-3xl p-2 !bg-amber-800"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default SignUp;
