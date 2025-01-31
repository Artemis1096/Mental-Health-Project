import Footer from "../Components/Footer";
import HomeComponent from "../Components/HomeComponent";
import NavBar from "../Components/NavBar";
import { useSelector } from "react-redux";
function Homepage() {
  const users = useSelector((state) => state.User);

  return (
    <div>
      <div>
        <h1>Hi ...</h1>
        <ul>
          {users.length > 0
            ? users.map((user) => <li key={user.id}>{user.name}</li>)
            : "SomeOne"}
        </ul>
      </div>
      <HomeComponent />
      <Footer />
    </div>
  );
}

export default Homepage;
