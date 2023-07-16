import { useEffect } from "react";

import VideoItem from "./VideoItem";
import { IVideoList } from "../interfaces/components";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchVideoList } from "../store/redusers/videoList/ActionCreater";
const VideoList = ({ search, count = "10" }: IVideoList) => {
  const { videoList } = useAppSelector((state) => state.videoListReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchVideoList({ search: search, count: count }));
  }, []);

  return (
    <div className="videoList">
      {videoList?.length ? (
        videoList.map((val) => {
          return <VideoItem key={val.id} video={val} isFavoritesPage={false} />;
        })
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};
export default VideoList;
