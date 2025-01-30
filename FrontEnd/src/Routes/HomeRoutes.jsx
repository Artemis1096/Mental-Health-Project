import { Routes, Route } from "react-router";
import Homepage from "../pages/Homepage";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import AboutUs from "../pages/AboutUs";
function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  );
}

export default HomeRoutes;
