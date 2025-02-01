import { BrowserRouter } from "react-router-dom";
import HomeRoutes from "./Routes/HomeRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <HomeRoutes />
    </BrowserRouter>
  );
}

export default App;
