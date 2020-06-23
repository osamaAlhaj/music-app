import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback"; // https://github.com/gilbarbara/react-spotify-web-playback
import Aside from "./Aside.js";
import Album from "./Album";
import LyricsBox from "./lyricsBox/LyricsBox";
function Main({ token }) {
  const [releases, setReleases] = useState([]);
  const [playURIs, setPlayURIs] = useState([]);
  const [play, setPlay] = useState(null);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/browse/new-releases", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.albums.items);
        setReleases(res.albums.items);
      });
  }, [token]);

  return (
    <div className="flex flex-col h-screen text-sm text-gray-400">
      <div className="flex-1 flex overflow-y-hidden">
        <div className="sidebar w-48 flex-none flex flex-col justify-between bg-gray_aside font-semibold">
          <div className="py-6">
            here comes our Logo, import it here "main.js"
            <Aside />
          </div>
          <div className="py-6"></div>
          <div className="overflow-y-auto bg-scroll container">
            <p>Playlists</p>
          </div>
        </div>
        <div className="content-area flex-1 overflow-y-auto bg-gray_content h-screen">
          This is the content area
          <h2>New Releases</h2>
          <div>
            {releases.map((release) => (
              <Album
                setPlay={setPlay}
                setPlayURIs={setPlayURIs}
                release={release}
              />
            ))}
          </div>
        </div>
        <div className=" w-56 bg-gray-600">
          {" "}
          <h2>rechtes frage</h2>
          <br></br>
          <h4>PlatzHalter für Osama</h4>
          <LyricsBox />
        </div>
      </div>
      <div>
        <div className="">
          <SpotifyPlayer
            token={token}
            uris={playURIs}
            play={play}
            callback={(data) => {
              setPlay(data.isPlaying);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
