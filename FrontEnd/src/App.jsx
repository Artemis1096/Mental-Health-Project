import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import HomeRoutes from "./Routes/HomeRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <HomeRoutes />
    </BrowserRouter>
  );
}

export default App;
