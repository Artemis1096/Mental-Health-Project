import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import Button from "./Button";
import OtpVerification from "./OtpVerification";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otpFlag, setOtpFlag] = useState(false); // Handling OTP flag internally
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    // Ensure passwords match before submission

    let length = password.length;
    if (length < 6) {
      alert("Password should be atleast 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // const data = { fullName, email, dob, password, confirmPassword };
    // console.log(data);
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!isSubmitted) return;

    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/register",
          {
            name: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            dob: dob,
          }
        );

        //console.log(res.data);
        setOtpFlag(true); // Set OTP flag to true after successful registration
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setIsSubmitted(false);
      }
    };

    fetchData();
  }, [isSubmitted]);

  return (
    <>
      {!otpFlag ? (
        <form className="space-y-4" onSubmit={handleSubmitRegister}>
          <div>
            <label className="block text-black font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mt-1 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full mt-1 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button
            label="Register"
            type="submit"
            className="w-full bg-blue-800"
          />
        </form>
      ) : (
        <OtpVerification
          isOtpSubmitted={isOtpSubmitted}
          setIsOtpSubmitted={setIsOtpSubmitted}
          email={email}
        /> // Only show OTP after registration
      )}
    </>
  );
}

export default Register;
