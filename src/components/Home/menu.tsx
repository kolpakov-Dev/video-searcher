import { AiFillStar, AiTwotoneSetting } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            SearchVideo <BiSolidVideos />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/favorites"
          >
            Favorites <AiFillStar />
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/settings"
          >
            Settings <AiTwotoneSetting />
          </NavLink>
        </li> */}
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/profile"
          >
            Profile <FaUserCircle />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Menu;
