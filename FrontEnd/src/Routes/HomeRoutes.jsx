import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from "../Views/LandingPage";
import Profile from "../Views/Profile";
import Login from "../Views/Login";
import AboutUs from "../Views/AboutUs";
import SignUp from "../Views/SignUp";
import MainContainer from "../Views/MainContainer";
import ArticlesPage from "../Views/ArticlesPage";
import MeditationTimer from "../Views/MeditationTimer";
import AllUsersList from "../Views/AllUsersList";
import HomePage from "../Views/HomePage";
import FriendsList from "../Views/FriendsList";
import ArticleDetails from "../Views/ArticleDetails";
import Chat from "../Views/Chat";
import JournalPage from "../Views/JournalPage";
import Aichat from "../Views/AIchat";
import { UseAuthContext } from "../Context/AuthContext";
import OtpVerification from "../Components/OtpVerification";

function HomeRoutes() {
  const { auth } = UseAuthContext();

  return (
    <Routes>
      {/* Root routes */}
      <Route
        path="/"
        element={auth ? <Navigate to="/app" /> : <LandingPage />}
      />

      <Route
        path="/login"
        element={auth ? <Navigate to="/app" /> : <Login />}
      />
      <Route
        path="/register"
        element={auth ? <Navigate to="/app" /> : <SignUp />}
      />

      {/* Protected Routes */}
      <Route
        path="/app"
        element={auth ? <MainContainer /> : <Navigate to="/login" />}
      >
        {/* Redirect /app to /app/home */}
        <Route index element={<Navigate to="home" />} />

        {/* Nested routes inside MainContainer */}
        <Route path="home" element={<HomePage />} />
        <Route path="chat" element={<Chat />} />
        <Route path="allUsers" element={<AllUsersList />} />
        <Route path="friends" element={<FriendsList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="meditate" element={<MeditationTimer />} />
        <Route path="aichat" element={<Aichat />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:id" element={<ArticleDetails />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="journal" element={<JournalPage />} />
      </Route>
    </Routes>
  );
}

export default HomeRoutes;
