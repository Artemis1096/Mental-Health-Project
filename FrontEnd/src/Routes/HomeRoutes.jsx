import { Routes, Route } from "react-router-dom";
import Homepage from "../Views/Homepage";
import Profile from "../Views/Profile";
import Login from "../Views/Login";
import AboutUs from "../Views/AboutUs";
import Register from "../Components/Register";
import SignUp from "../Views/SignUp";
import MainContainer from "../Views/MainContainer";
import Articles from "../Views/Articles";

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/app" element={<MainContainer />}>
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="articles" element={<Articles />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default HomeRoutes;
