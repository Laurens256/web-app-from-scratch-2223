type trackNames =
	| 'title-screen'
	| 'driftveil'
	| 'viridian'
	| 'celadon'
	| 'pewter'
	| 'oak-lab'
	| 'pallet';

// beep
const playBeepSound = () => {
	const focusAudio = new Audio('/audio/select_effect.wav');
	focusAudio.play();
};

// speel pokemon cry sfx of error sfx
const playCry = (fallback = true) => {
	let fallbackUsed = false;
	const audio = new Audio();
	audio.src = `https://play.pokemonshowdown.com/audio/cries/${window.location.pathname
		.split('/')
		.pop()}.mp3`;
	if (fallback) {
		audio.onerror = () => {
			if (fallbackUsed) return;
			fallbackUsed = true;
			const fallbackAudio = new Audio('/audio/whoops.wav');
			fallbackAudio.play();
		};
	}
	audio.play();
};

const bgTracks: { name: trackNames; src: string; canBeRandom: boolean }[] = [
	{ name: 'title-screen', src: '/audio/title_screen.mp3', canBeRandom: false },
	{ name: 'driftveil', src: '/audio/bg_driftveil.mp3', canBeRandom: false },
	{ name: 'viridian', src: '/audio/bg_viridian.mp3', canBeRandom: true },
	{ name: 'celadon', src: '/audio/bg_celadon.mp3', canBeRandom: true },
	{ name: 'pewter', src: '/audio/bg_pewter.mp3', canBeRandom: true },
	{ name: 'oak-lab', src: '/audio/bg_oak_lab.mp3', canBeRandom: true },
	{ name: 'pallet', src: '/audio/bg_pallet.mp3', canBeRandom: true }
];

const randomTracks = bgTracks.filter((track) => track.canBeRandom);
let playedRandomTracks: typeof bgTracks[number][] = [];
let currentTrack: typeof bgTracks[number] | undefined;

// function om de achtergrondmuziek te spelen
const bgAudio = new Audio();
bgAudio.volume = 0.3;

const playBgMusic = (name: trackNames | undefined) => {
	console.log(name);
	if (
		!name &&
		!bgAudio.paused &&
		currentTrack &&
		(randomTracks.includes(currentTrack) || currentTrack.name == 'driftveil')
	)
		return;

	let track: typeof bgTracks[number] | undefined;

	if (name) {
		track = bgTracks.find((track) => track.name === name) as typeof bgTracks[number];
	} else {
		// als alle random tracks zijn afgespeeld, reset de array
		if (randomTracks.length === playedRandomTracks.length) {
			playedRandomTracks = [];
		}

		// filter de random tracks die al zijn afgespeeld
		const viableTracks = randomTracks.filter(
			(track) => !playedRandomTracks.includes(track)
		);

		// kies een random track
		track = viableTracks[Math.floor(Math.random() * viableTracks.length)];
		playedRandomTracks.push(track);
	}

	if (track) {
		currentTrack = track;
		bgAudio.addEventListener('ended', playBgMusic.bind(null, name), { once: true });
		bgAudio.src = track.src;
		bgAudio.play();
	}
};

export { trackNames, playBeepSound, playCry, playBgMusic };
