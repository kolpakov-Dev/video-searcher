import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./home.css";
import Menu from "./menu";
import Profile from "../Profile/Profile";
import Favorites from "../Favorites/Favorites";
import SearchVideo from "../SearchVideo/SearchVideo";
import Settings from "../Settings/Settings";

function Home() {
  return (
    <div className="homePage">
      <Menu />
      <div className="content">
        <Routes>
          <Route path="/" element={<SearchVideo />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
