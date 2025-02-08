import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

import Button from "./Button";
import OtpVerification from "./OtpVerification";

//Please add comment when adding or fixing anything in the code.

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otpFlag, setOtpFlag] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const notifyError = (label) => toast.error(label);

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    let length = password.length;
    if (length < 6) {
      alert("Password should be atleast 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!isSubmitted) return;

    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/register",
          {
            username: username,
            name: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            dob: dob,
          }
        );

        if (res.data.message === "User created successfully") setOtpFlag(true);
      } catch (error) {
        notifyError(error.response?.data);
      } finally {
        setIsSubmitted(false);
      }
    };

    fetchData();
  }, [isSubmitted]);

  return (
    <>
      <Toaster />
      {!otpFlag ? (
        <form
          className="space-y-3 p-4 w-full bg-orange-200 shadow rounded-xl  h-96 overflow-y-scroll "
          onSubmit={handleSubmitRegister}
        >
          <div>
            <label className="block text-black font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Create an username"
              className="w-full mt-1 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
            <label className="block text-black font-medium">Email</label>
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
            <label className="block text-black font-medium">
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
            <label className="block text-black font-medium">Password</label>
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
            <label className="block text-black font-medium">
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
            className="w-full bg-blue-900 "
          />
        </form>
      ) : (
        <OtpVerification
          isOtpSubmitted={isOtpSubmitted}
          setIsOtpSubmitted={setIsOtpSubmitted}
          email={email}
        />
      )}
    </>
  );
}

export default Register;
