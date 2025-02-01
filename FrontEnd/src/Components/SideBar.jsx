import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // ✅ Corrected import
import { logout } from "../Features/User/UserSlice";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { GiRamProfile } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { GrArticle } from "react-icons/gr";
import { LuMailQuestion } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";

import axios from "axios";

function SideBar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log("logout");

    try {
      const res = await axios.post("http://localhost:8000/api/auth/logout");
      console.log(res);
      dispatch(logout());
      navigate("/"); // ✅ Correct logout navigation
    } catch (err) {
      console.log(err);
    }
  };

  const Menu = [
    { id: 1, title: "Article", symbol: <GrArticle />, link: "articles" },
    {
      id: 2,
      title: "About Us",
      symbol: <LuMailQuestion />,
      link: "aboutus",
    },
    { id: 3, title: "Profile", symbol: <CgProfile />, link: "profile" },
    { id: 4, title: "Meditate", symbol: <CgProfile />, link: "meditate" },
    { id: 5, title: "Log Out", symbol: <IoMdLogOut />, action: handleLogOut },
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 h-screen p-5 pt-8 bg-purple-900 text-white absolute`}
    >
      {/* Toggle Sidebar Button */}
      <div
        onClick={() => setOpen(!open)}
        className={`absolute top-9 right-[-14px] w-7 h-7 flex items-center justify-center 
         border-2 border-purple-900 bg-white text-purple-900 rounded-full 
         cursor-pointer shadow-md ${!open && "rotate-180"} `}
      >
        <HiArrowNarrowLeft />
      </div>

      {/* Logo Section */}
      <div className="flex gap-x-4 items-center">
        <div className={`cursor-pointer duration-500`}>
          <GiRamProfile />
        </div>
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Peace
        </h1>
      </div>

      {/* Menu List */}
      <ul className="pt-6">
        {Menu.map((menu) => (
          <li
            key={menu.id}
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-purple-600 rounded-md"
          >
            {menu.symbol}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {menu.action ? (
                <button className="cursor-pointer" onClick={menu.action}>
                  {menu.title}
                </button>
              ) : (
                <Link to={menu.link}>{menu.title}</Link>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
