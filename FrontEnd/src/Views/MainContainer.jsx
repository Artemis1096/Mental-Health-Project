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
      <div className="ml-20 flex-1 p-8">
        {/* <h2 className="text-3xl font-semibold text-purple-900">Hi..</h2>
        <div className="mt-4 text-xl text-gray-800">
          {user.map((user) => (
            <h1 key={user.id}>{user.name}</h1>
          ))}
        </div> */}
        <Outlet />
       
      </div>
    </div>
  );
}

export default MainContainer;
