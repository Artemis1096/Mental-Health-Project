import { Routes, Route } from "react-router-dom";
import Homepage from "../Views/Homepage";
import Profile from "../Views/Profile";
import Login from "../Views/Login";
import AboutUs from "../Views/AboutUs";
import Register from "../Components/Register";
import SignUp from "../Views/SignUp";
import MainContainer from "../Views/MainContainer";
import ArticlesPage from "../Views/ArticlesPage";
import MeditationTimer from "../Views/MeditationTimer";
import ArticleDetails from "../Views/ArticleDetails";

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/app" element={<MainContainer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/app" element={<MainContainer />}>
        <Route path="profile" element={<Profile />} />
        <Route path="meditate" element={<MeditationTimer />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:id" element={<ArticleDetails />} />
        <Route path="aboutus" element={<AboutUs />} />
      </Route>
    </Routes>
  );
}

export default HomeRoutes;
