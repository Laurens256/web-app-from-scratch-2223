const cry = new Audio();

const playCry = () => {
	cry.src = `https://play.pokemonshowdown.com/audio/cries/${window.location.pathname.split('/').pop()}.ogg`;
	cry.play();
};

const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === ' ') {
		e.preventDefault();
		playCry();
	} else if (e.key === 'b' || e.key === 'Escape') {
		e.preventDefault();
		window.history.back();
	}
};

export { handleKeyDown };