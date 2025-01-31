import { Routes, Route } from "react-router";
import Homepage from "../Views/Homepage";
import Profile from "../Views/Profile";
import Login from "../Views/Login";
import AboutUs from "../Views/AboutUs";

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  );
}

export default HomeRoutes;
