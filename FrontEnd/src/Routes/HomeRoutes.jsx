import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../Views/LandingPage";
import Profile from "../Views/Profile";
import Login from "../Views/Login";
import AboutUs from "../Views/AboutUs";
import Register from "../Components/Register";
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
import { UseAuthContext } from "../context/AuthContext";

function HomeRoutes() {
  const { auth } = UseAuthContext();
  return (
    <Routes>
      <Route
        path="/"
        element={auth ? <Navigate to="/app" /> : <LandingPage />}
      />
      <Route
        path="/app"
        element={!auth ? <Navigate to="/login" /> : <MainContainer />}
      />
      <Route
        path="/profile"
        element={!auth ? <Navigate to="/login" /> : <Profile />}
      />
      <Route
        path="/login"
        element={auth ? <Navigate to="/app" /> : <Login />}
      />
      <Route
        path="/register"
        element={auth ? <Navigate to="/app" /> : <SignUp />}
      />

      {/* Main container and its nested routes */}
      <Route
        path="/app"
        element={!auth ? <Navigate to="/login" /> : <MainContainer />}
      >
        <Route
          path="home"
          element={!auth ? <Navigate to="/login" /> : <HomePage />}
        />
        <Route
          path="chat"
          element={!auth ? <Navigate to="/login" /> : <Chat />}
        />
        <Route
          path="allUsers"
          element={!auth ? <Navigate to="/login" /> : <AllUsersList />}
        />
        <Route
          path="friends"
          element={!auth ? <Navigate to="/login" /> : <FriendsList />}
        />
        <Route
          path="profile"
          element={!auth ? <Navigate to="/login" /> : <Profile />}
        />
        <Route
          path="meditate"
          element={!auth ? <Navigate to="/login" /> : <MeditationTimer />}
        />
        <Route
          path="articles"
          element={!auth ? <Navigate to="/login" /> : <ArticlesPage />}
        />
        <Route
          path="articles/:id"
          element={!auth ? <Navigate to="/login" /> : <ArticleDetails />}
        />
        <Route
          path="aboutus"
          element={!auth ? <Navigate to="/login" /> : <AboutUs />}
        />
        <Route
          path="journal"
          element={!auth ? <Navigate to="/login" /> : <JournalPage />}
        />
      </Route>
    </Routes>
  );
}

export default HomeRoutes;
