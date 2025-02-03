import { Routes, Route } from "react-router-dom";
import LandingPage from "../Views/LandingPage";
import Profile from "../Views/Profile";
import Login from "../Views/Login";
import AboutUs from "../Views/AboutUs";
import Register from "../Components/Register";
import SignUp from "../Views/SignUp";
import MainContainer from "../Views/MainContainer";
import Articles from "../Views/Articles";
import MeditationTimer from "../Views/MeditationTimer";
import AllUsersList from "../Views/AllUsersList";
import HomePage from "../Views/HomePage";
import FriendsList from "../Views/FriendsList";
import Chat from "../Views/Chat.jsx";
function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<MainContainer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/app" element={<MainContainer />}>
        <Route path="home" element={<HomePage />} />
        <Route path="chat" element={<Chat />} />
        <Route path="allUsers" element={<AllUsersList />} />
        <Route path="friends" element={<FriendsList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="meditate" element={<MeditationTimer />} />
        <Route path="articles" element={<Articles />} />
        <Route path="aboutus" element={<AboutUs />} />
      </Route>
    </Routes>
  );
}

export default HomeRoutes;
