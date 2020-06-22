import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'; // https://github.com/gilbarbara/react-spotify-web-playback

function Main({ token }) {
	const [releases, setReleases] = useState([]);
	const [playURIs, setPlayURIs] = useState([]);
	const [play, setPlay] = useState(null);

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

	return (
		<div>
			<h2>New Releases</h2>
			<div>
				{releases.map(release => (
					<div>
						<h3
							onClick={() => {
								console.log(release.uri);
								setPlayURIs(release.uri);
								setPlay(true);
							}}
						>
							{release.name}
						</h3>
						<p>{release.artists[0].name}</p>
					</div>
				))}
			</div>
			<SpotifyPlayer
				token={token}
				uris={playURIs}
				play={play}
				callback={data => {
					setPlay(data.isPlaying);
				}}
			/>
		</div>
	);
}

export default Main;
