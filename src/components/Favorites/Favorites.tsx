import "./favorites.css";
import VideoItem from "./../VideoItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { IVideo } from "../../interfaces/IVideo";
import { useEffect } from "react";
import { fetchFavorites } from "../../store/redusers/favorites/ActionCreater";
const Favorites = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { favorites } = useAppSelector((state) => state.favoritesReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!favorites) {
      dispatch(fetchFavorites(""));
    }
  }, []);
  return (
    <>
      <h2 className="favoritesH">Favorites:</h2>
      {user ? (
        <div className="videoList">
          {favorites ? (
            favorites.map((val: IVideo, index) => {
              return <VideoItem video={val} isFavoritesPage={true} />;
            })
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : (
        <div className="needLogInBlock">
          <h3>You need to be logged in to use this page</h3>
          <div className="loginLink" onClick={() => navigate("/profile")}>
            Login
          </div>
        </div>
      )}
    </>
  );
};
export default Favorites;
