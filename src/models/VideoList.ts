import { query, collection, where, getDocs } from "@firebase/firestore";
import axios from "axios";
import { auth, firestore } from "../firebase-setup/firebase";
import { IVideo } from "../interfaces/IVideo";

export const fetchVideo = (search: string, count: string) => {
  if (search === "") {
    return null;
  }
  try {
    const getVideoEvent = axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${count}&q=${search}&key=AIzaSyAtzO79iG0I9uN7WBzhcENUqyR2gKchoW8`
      )
      .then(async (response) => {
        let videoFromYoutube = convertVideoList(response.data.items);

        if (!auth.currentUser) return videoFromYoutube;
        const favoriteList = await getFavorites(auth.currentUser.uid);
        if (!favoriteList) return videoFromYoutube;
        console.log("FAVORITES" + favoriteList);
        videoFromYoutube.forEach((youtubeVideo) => {
          let isFavorite = false;
          favoriteList.forEach((favorite) => {
            console.log(favorite.id + "===" + youtubeVideo.id);
            if (favorite.id === youtubeVideo.id) isFavorite = true;
          });
          youtubeVideo.isFavorite = isFavorite;
        });
        console.log(videoFromYoutube);
        return videoFromYoutube;
      });
    return getVideoEvent;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};
const convertVideoList = (videoList: any[]) => {
  const resultArr = videoList.map((item) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.medium.url,
      width: item.snippet.thumbnails.medium.width,
      height: item.snippet.thumbnails.medium.height,
      isFavorite: false,
    } as IVideo;
  });
  return resultArr as IVideo[];
};
export const getFavorites = async (userID: string) => {
  const q = query(
    collection(firestore, "favorites"),
    where("userID", "==", userID)
  );
  const getFavoritesPromise = getDocs(q).then((querySnapshot) => {
    if (querySnapshot.empty) {
      return null;
    } else {
      let favoriteList = [];
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        console.log(querySnapshot.docs[i].data());
        favoriteList.push({
          ...querySnapshot.docs[i].data(),
        });
      }
      return favoriteList;
    }
  });
  return await getFavoritesPromise;
};
