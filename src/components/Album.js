import React from 'react';
import '../assets/main.css';
import '../assets/album.css';

function Album({ release, playTrack }) {
	return (
		<div
			className="flip-card m-2 group card card-body flipcard"
			onClick={() => playTrack(release.uri)}
		>
			<div className="inner w-full flex ">
				<div className="front h-48 w-48 bg-cover rounded-t-lg text-center overflow-hidden ">
					<img src={release.images[1].url} alt={release.name} />
				</div>
				{/* border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 */}
				<div className="back bg-white rounded-b-lg rounded-t-lg p-4  flex flex-col justify-between leading-normal">
					<div className="px-6 py-4">
						<p className="text-lg font-bold text-colorPallete_MintGreen">
							{release.artists[0].name.length > 20
								? release.artists[0].name.substring(0, 20) + '...'
								: release.artists[0].name}
						</p>
						<p className="text-lg text-colorPallete_Blue mt-5"> OMG xD </p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Album;
