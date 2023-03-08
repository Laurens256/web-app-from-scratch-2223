const playBeepSound = () => {
	const focusAudio = new Audio('/audio/select_effect.wav');
	focusAudio.play();
};

const playCry = (fallback = true) => {
	let fallbackUsed = false;
	const audio = new Audio();
	audio.src = `https://play.pokemonshowdown.com/audio/cries/${window.location.pathname.split('/').pop()}.mp3`;
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

const bgTracks = [
	{ name: 'title-screen', src: '/audio/title_screen.mp3', canBeRandom: false },
	{ name: 'driftveil', src: '/audio/bg_driftveil.mp3', canBeRandom: false },
	{ name: 'viridian', src: '/audio/bg_viridian.mp3', canBeRandom: true },
	{ name: 'celadon', src: '/audio/bg_celadon.mp3', canBeRandom: true },
	{ name: 'pewter', src: '/audio/bg_pewter.mp3', canBeRandom: true },
	{ name: 'oak-lab', src: '/audio/bg_oak_lab.mp3', canBeRandom: true },
	{ name: 'pallet', src: '/audio/bg_pallet.mp3', canBeRandom: true },
];

const randomTracks = bgTracks.filter((track) => track.canBeRandom);
let playedRandomTracks: typeof bgTracks[number][] = [];
let currentTrack: typeof bgTracks[number] | undefined;

// function om de achtergrondmuziek te spelen
const bgAudio = new Audio();
bgAudio.volume = 0.3;
const playBgMusic = (random: boolean, keepPlaying = false, name?: string) => {
	console.log(name, currentTrack);
	// check if the current track is a random track or driftveil and if it is, don't play a new random track
	if (keepPlaying && currentTrack && (randomTracks.includes(currentTrack) || currentTrack.name == 'driftveil')) return;

	bgAudio.removeEventListener('ended', playBgMusic.bind(null, random, true, name));

	let track: typeof bgTracks[number] | undefined;
	if (random) {
		if (randomTracks.length === playedRandomTracks.length) {
			playedRandomTracks = [];
		}
		track = randomTracks[Math.floor(Math.random() * randomTracks.length)];
		playedRandomTracks.push(track);
	} else {
		track = bgTracks.find((track) => track.name === name);
	}
	if (!track) return;

	if(keepPlaying) {
		bgAudio.addEventListener('ended', playBgMusic.bind(null, random, true, name));
	}

	console.log(track);
	currentTrack = track;
	bgAudio.src = track.src;
	bgAudio.play();
};

playBgMusic(true, true);

export { playBeepSound, playCry, playBgMusic };
