const playBeepSound = () => {
	const focusAudio = new Audio('/assets/audio/select_effect.wav');
	focusAudio.play();
};

export { playBeepSound };
