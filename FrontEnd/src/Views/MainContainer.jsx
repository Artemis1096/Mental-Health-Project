import { useSelector } from "react-redux";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import AboutUs from "./AboutUs";

function MainContainer() {
  const user = useSelector((state) => state.User);
  const [open, setOpen] = useState(false);

  //   console.log(user);

  return (
    <div className=" flex h-screen">
      {/* Sidebar */}

      <SideBar open={open} setOpen={setOpen} />
      {/* Main Content */}
      <div className="ml-20 flex-1 overflow-y-scroll" onClick={() => setOpen(false)}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainContainer;
