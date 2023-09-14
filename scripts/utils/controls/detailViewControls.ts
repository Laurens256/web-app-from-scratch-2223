import { goToAdjacentPokemon, nextExists, previousExists } from '../../views/detailView';
import { playCry } from '../soundEffects';


const detailViewKeyDown = (e: KeyboardEvent) => {
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
		const backAnchor = document.querySelector('a.back');
		if (backAnchor instanceof HTMLAnchorElement) {
			backAnchor.click();
		}
	}
};

export { detailViewKeyDown };