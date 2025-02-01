import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/User/UserSlice";
import * as FaIcons from "react-icons/fa";
import { useState, useEffect } from "react";

function NavBar() {
  const user = useSelector((state) => state.User);
  const isLoggedIn = useSelector((state) => state.isLoggedIn); // Access isLoggedIn from Redux

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout()); // Dispatch logout to clear the user and update state
  };

  useEffect(() => {
    // This will log the changes in isLoggedIn state
    console.log("IsLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <nav className="h-screen w-1/5 flex flex-col justify-between items-center bg-gray-800 p-4 text-white">
      <h2 className="text-2xl font-bold">
        <Link to="/" className="text-white hover:text-orange-500">
          Logo
        </Link>
      </h2>
      <div className="flex space-x-6">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/profile"
              className="text-white hover:text-orange-500 transition duration-200"
            >
              Profile
            </Link>
          </li>
          <li>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-white hover:text-orange-500 transition duration-200"
              >
                Log In
              </Link>
            ) : (
              <button onClick={handleLogOut}>Log Out</button>
            )}
          </li>
          <li>
            <Link
              to="/aboutus"
              className="text-white hover:text-orange-500 transition duration-200"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link to="#" className="text-white hover:text-orange-500">
              <FaIcons.FaBars />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
