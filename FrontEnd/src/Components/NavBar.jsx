import { Link } from "react-router-dom"; // Ensure you import from react-router-dom

function NavBar() {
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
            <Link
              to="/login"
              className="text-white hover:text-orange-500 transition duration-200"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className="text-white hover:text-orange-500 transition duration-200"
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
