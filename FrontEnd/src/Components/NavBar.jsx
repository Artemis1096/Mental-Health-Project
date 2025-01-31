import { Link } from "react-router-dom";
import { useState } from "react";

import * as FaIcons from "react-icons/fa";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
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
            {/* Add a toggle so that, when a user is logged in , he dont see the login button */}
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-white hover:text-orange-500 transition duration-200"
              >
                Log In
              </Link>
            ) : null}
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

export default NavBar;
