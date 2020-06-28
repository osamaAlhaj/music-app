import React, { useState, useEffect } from 'react';
import TopView from './TopMainView.js';
import SpotifyPlayer from 'react-spotify-web-playback'; // https://github.com/gilbarbara/react-spotify-web-playback
import waait from 'waait'; // https://www.npmjs.com/package/waait
import PlaylistView from './PlaylistView';
import AlbumView from './AlbumView';

function MiddleFrame({
	token,
	setTitle,
	setArtist,
	playlistID,
	setPlaylistID,
	albumID,
	setAlbumID,
}) {
	const [releases, setReleases] = useState([]);
	const [playURIs, setPlayURIs] = useState([]);

	const [play, setPlay] = useState(null);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		fetch('https://api.spotify.com/v1/browse/new-releases', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(res => {
				console.log(res.albums.items);
				setReleases(res.albums.items);
			});
	}, [token]);
	useEffect(() => {
		console.log("middleFrame rendert")
	})

	async function playTrack(uri) {
		setPlay(false);
		await waait(100);
		setPlayURIs(uri);
		setPlay(true);
	}

	return (
		<div className="z-0  flex-1 overflow-y-auto bg-colorPallete_Blue h-screen relative p-8">
			{/* ContentAREA //<-- TOPVIEW-->//*/}
			<div>
				<TopView
					playTrack={playTrack}
					releases={releases}
					setAlbumID={setAlbumID}
					setPlaylistID={setPlaylistID}
				/>
				{playlistID && (
					<PlaylistView
						token={token}
						playlistID={playlistID}
						playTrack={playTrack}
						setOffset={setOffset}
					/>
				)}
				{albumID && (
					<AlbumView token={token} albumID={albumID} playTrack={playTrack} setOffset={setOffset} />
				)}
			</div>
			<div className="absolute bottom-0 inset-x-0">
				<SpotifyPlayer
					token={token}
					uris={playURIs}
					play={play}
					offset={offset}
					callback={data => {
						setTitle(data.track.name);
						setArtist(data.track.artists);
					}}
				/>
			</div>
		</div>
	);
}

export default MiddleFrame;
