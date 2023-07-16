import { useState } from "react";
import "./searchVideo.css";
import VideoList from "../VideoList";

function SearchVideo() {
  const [searchText, setSearchText] = useState("");
  const [sendForm, setSendForm] = useState(false);
  const [formText, setFormText] = useState("");
  const [formVideoCount, setFormVideoCount] = useState("");
  const [videoCount, setVideoCount] = useState("");
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const inputNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoCount(event.target.value);
  };
  const sendFormFunc = () => {
    if (searchText !== "" && videoCount !== "") {
      setSendForm(true);
      setFormText(searchText.trim());
      setFormVideoCount(videoCount);
    }
  };
  const formSubmit = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.code === "Enter") {
      sendFormFunc();
    }
  };
  return (
    <div className="searchVideoPage">
      <h1>Search video in Youtube</h1>
      <div className="inputBlock">
        <input
          type="text"
          value={searchText}
          onChange={inputChange}
          onKeyDown={() => formSubmit}
        />
        <input
          type="number"
          value={videoCount}
          onChange={inputNumberChange}
          onKeyDown={() => formSubmit}
          placeholder="video count"
          className="numberInput"
        />
        <div className="searchBtn" onClick={sendFormFunc}>
          search
        </div>
      </div>
      {!sendForm ? (
        <div className="writeText">
          Write keywords and click search or write Enter.
        </div>
      ) : (
        <VideoList search={formText} count={formVideoCount} />
      )}
    </div>
  );
}

export default SearchVideo;
