import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import axios from "axios";

function OtpVerification({ isOtpSubmitted, setIsOtpSubmitted, email }) {
  const [otp, setOtp] = useState("");

  const handleSubmitOtp = (e) => {
    e.preventDefault();

    setIsOtpSubmitted(true);
  };

  const handleResendOtp = (e) => {
    const data = axios
      .post("http://localhost:8080/api/auth/resendotp", {
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
    if (!isOtpSubmitted) return;
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/verifyotp",
          { email: email, otp: otp }
        );
        console.log(res.data);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setOtp("");
      }
    };
    fetchData();
  }, [isOtpSubmitted]);

  return (
    <div>
      <label>Enter the Otp</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleSubmitOtp}>Verify</button>
      <p>did not received the OTP?</p>
      <button onClick={handleResendOtp}>try again</button>
    </div>
  );
}

OtpVerification.propTypes = {
  isOtpSubmitted: PropTypes.string.isRequired,
  setIsOtpSubmitted: PropTypes.func.isRequired,
  email: PropTypes.func.isRequired,
};

export default OtpVerification;
