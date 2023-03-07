import { goToAdjacentPokemon, nextExists, previousExists } from '../../views/detailView';

const playCry = () => {
	new Audio(`https://play.pokemonshowdown.com/audio/cries/${window.location.pathname.split('/').pop()}.ogg`).play();
};

const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === ' ') {
		e.preventDefault();
		playCry();
	} else if (e.key === 'ArrowRight' && nextExists) {
		e.preventDefault();
		goToAdjacentPokemon(1);
	} else if (e.key === 'ArrowLeft' && previousExists) {
		e.preventDefault();
		goToAdjacentPokemon(-1);
	} else if (e.key === 'b' || e.key === 'Escape') {
		e.preventDefault();
		// heel illegaal maar deze buton heeft alle logic er al achter en ben lui
		const backButton = document.querySelector('button.back');
		if (backButton instanceof HTMLButtonElement) {
			backButton.click();
		}
	}
};

export { handleKeyDown };