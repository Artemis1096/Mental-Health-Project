import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import axios from "axios";

function OtpVerification({ isOtpSubmitted, setIsOtpSubmitted, email }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [isEffect, setIsEffect] = useState(false);

  const notifyError = (label) => toast.error(label);
  const notifySuccess = (label) => toast.success(label);

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    setIsEffect(!isEffect);
  };

  const handleResendOtp = (e) => {
    const data = axios
      .post("http://localhost:8000/api/auth/resendotp", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/verifyotp",
          { email: email, otp: otp }
        );
        //console.log(res.data);

        notifySuccess("OTP verified!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setIsOtpSubmitted(true);
      } catch (error) {
        notifyError(error.response?.data.message);
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setOtp("");
      }
    };
    fetchData();
  }, [isEffect]);

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center  bg-gray-100 rounded-2xl">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            OTP Verification
          </h2>
          <form onSubmit={handleSubmitOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-center mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 text-purple-900 border !border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 !bg-purple-500 text-white font-semibold rounded-lg hover:!bg-orange-600 transition duration-200"
            >
              Verify
            </button>
          </form>
          <p className="text-center text-sm text-black mt-4">
            Didn&apos;t receive the OTP?
          </p>
          <button
            onClick={handleResendOtp}
            className="w-full py-2 mt-2 !text-black border !border-orange-500 rounded-lg hover:!bg-purple-500 hover:text-white transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );
}

OtpVerification.propTypes = {
  isOtpSubmitted: PropTypes.bool.isRequired,
  setIsOtpSubmitted: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default OtpVerification;
