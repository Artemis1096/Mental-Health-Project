import { useSelector } from "react-redux";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import AboutUs from "./AboutUs";

function MainContainer() {
  const user = useSelector((state) => state.User);

  //   console.log(user);

  return (
    <div className=" flex h-screen">
      {/* Sidebar */}

      <SideBar />
      {/* Main Content */}
      <div className="ml-20 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MainContainer;
