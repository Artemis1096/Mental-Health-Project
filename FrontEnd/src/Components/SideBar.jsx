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
import { GiHeatHaze } from "react-icons/gi";
import { CiHome } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

import axios from "axios";
import JournalPage from "../Views/JournalPage";
import {UseAuthContext} from '../Context/AuthContext.jsx';

function SideBar({ open, setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {setAuth} = UseAuthContext();

  const handleLogOut = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/logout");
      console.log(res);
      dispatch(logout());
      setAuth(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const Menu = [
    { id: 0, title: "Home", symbol: <CiHome />, link: "home" },
    { id: 1, title: "Articles", symbol: <GrArticle />, link: "articles" },
    {
      id: 2,
      title: "About Us",
      symbol: <LuMailQuestion />,
      link: "aboutus",
    },
    { id: 3, title: "Profile", symbol: <CgProfile />, link: "profile" },
    { id: 4, title: "Ai Chat", symbol: <CgProfile />, link: "aichat" },
    { id: 5, title: "Meditate", symbol: <GiHeatHaze />, link: "meditate" },

    {
      id: 6,
      title: "Soulmate Finder",
      symbol: <FaUserFriends />,
      link: "allUsers",
    },
    { id: 7, title: "Friends", symbol: <GiThreeFriends />, link: "friends" },
    {
      id: 8,
      title: "Journal",
      symbol: <BsFillJournalBookmarkFill />,
      link: "journal",
    },
    { id: 9, title: "Log Out", symbol: <IoMdLogOut />, action: handleLogOut },
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 h-screen p-5 pt-8 bg-purple-600 text-white absolute`}
    >
      {/* Toggle Sidebar Button */}
      <div
        onClick={() => setOpen(!open)}
        className={`absolute top-9 right-[-14px] w-7 h-7 flex items-center justify-center 

         border-2 border-white bg-white text-purple-600 rounded-full 

         cursor-pointer shadow-md ${!open && "rotate-180"} `}
      >
        <HiArrowNarrowLeft />
      </div>

      {/* Logo Section */}
      <div className="flex gap-x-4 items-center">
        <div className={`cursor-pointer text-3xl duration-500`}>
          <GiRamProfile />
        </div>
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
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
            className="text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white hover:text-black rounded-md"
          >
            <Link to={menu.link}>
              <div className={`cursor-pointer text-2xl duration-500`}>
                {menu.symbol}
              </div>
            </Link>

            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {menu.action ? (
                <button className="cursor-pointer   " onClick={menu.action}>
                  {menu.title}
                </button>
              ) : (
                <Link to={menu.link} className="cursor-pointer ">
                  {menu.title}
                </Link>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
