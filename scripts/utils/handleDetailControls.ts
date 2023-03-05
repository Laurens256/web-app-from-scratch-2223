const playCry = () => {
	new Audio(`https://play.pokemonshowdown.com/audio/cries/${window.location.pathname.split('/').pop()}.ogg`).play();
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