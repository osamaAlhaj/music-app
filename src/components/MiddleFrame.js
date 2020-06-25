import React, { useState, useEffect } from "react";
import TopView from "./TopMainView.js";
import SpotifyPlayer from "react-spotify-web-playback"; // https://github.com/gilbarbara/react-spotify-web-playback
import waait from "waait"; // https://www.npmjs.com/package/waait
import PlaylistView from "./PlaylistView";

function MiddleFrame({ token, setTitle, setArtist, playlistID }) {
  const [releases, setReleases] = useState([]);
  const [playURIs, setPlayURIs] = useState([]);
  const [play, setPlay] = useState(null);
  var uris = [];
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
      })
      .then(
        fetch("https://api.spotify.com/v1/me/player/recently-played", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            for (let i = 0; i < res.items.length; i++) {
              uris.push(res.items[i].track.uri);
              setPlayURIs(uris);
              console.log("die uris " + playURIs);
            }
            //{
            // console.log("last played " + lastPlayed.track);
            //
            // }
          })
      );
  }, [token]);

  return (
    <div className="flex-1 content-area overflow-y-auto bg-colorPallete_Blue h-screen relative">
      {/* ContentAREA //<-- TOPVIEW-->//*/}
      <div>
        <TopView
          setPlay={setPlay}
          setPlayURIs={setPlayURIs}
          releases={releases}
        />
        {/* <TopView setPlay={setPlay} setPlayURIs={setPlayURIs} releases={releases} /> */}
      </div>
      <div className="absolute bottom-0 inset-x-0">
        <SpotifyPlayer
          showSaveIcon={true}
          token={token}
          uris={playURIs}
          play={play}
          callback={(data) => {
            setTitle(data.track.name);
            setArtist(data.track.artists);
          }}
        />
      </div>
    </div>
  );
  async function playTrack(uri) {
    setPlay(false);
    await waait(100);
    setPlayURIs(uri);
    setPlay(true);
  }
}

export default MiddleFrame;
