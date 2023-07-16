import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineHeart, AiFillHeart, AiFillCloseCircle } from "react-icons/ai";
import { IVideo } from "./../interfaces/IVideo";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  addtoFavorites,
  removeFromFavorites,
} from "../store/redusers/favorites/ActionCreater";
import { VideoListSlice } from "../store/redusers/videoList/VideoListSlice";
interface Props {
  video: IVideo;
  isFavoritesPage: boolean;
}
const VideoItem = ({ video, isFavoritesPage }: Props) => {
  const [showVideo, setShowVideo] = useState(false);
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const updateVideo = VideoListSlice.actions.updateVideo;
  const pushToFavoritesEvent = () => {
    if (!user) {
      return;
    }
    dispatch(addtoFavorites(video));
    if (!isFavoritesPage) {
      dispatch(updateVideo(video));
    }
    toast.success("Video add to favorites.");
  };
  const removeFromFavoritesEvent = () => {
    dispatch(removeFromFavorites(video));
    if (!isFavoritesPage) dispatch(updateVideo(video));
    toast.success("Video deleted from favorites.");
  };

  return (
    <div className="youtubeItem">
      {!showVideo ? (
        <div className="imageBlock">
          <img
            src={video.thumb}
            width={video.width}
            height={video.height}
            alt=""
            onClick={() => setShowVideo(true)}
          />
          <div
            className={
              video.isFavorite ? "favoriteLink active" : "favoriteLink"
            }
          >
            {!video.isFavorite ? (
              <AiOutlineHeart onClick={pushToFavoritesEvent} />
            ) : (
              <AiFillHeart onClick={removeFromFavoritesEvent} />
            )}
          </div>
        </div>
      ) : (
        <div className="videoBlock">
          <iframe
            width={video.width}
            height={video.height}
            title={video.title}
            src={"https://www.youtube.com/embed/" + video.id}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <div className="closeVideo" onClick={() => setShowVideo(false)}>
            <AiFillCloseCircle />
          </div>
        </div>
      )}
      <h2>{video.title}</h2>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
export default VideoItem;
