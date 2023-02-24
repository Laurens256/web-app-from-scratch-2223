import { PokemonTypes } from '../../assets/types';

const getTypeBadge = (type: string) => {
	const typeDiv = document.createElement('div');
	typeDiv.classList.add('typebadge', type);

	let badgeName = '';
	switch (type.toLowerCase()) {
		case 'fighting':
			badgeName = 'fight';
			break;
		case 'psychic':
			badgeName = 'psychc';
			break;
		case 'electric':
			badgeName = 'electr';
			break;
		default:
			badgeName = PokemonTypes.includes(type.toLowerCase()) ? type : '???';
	}

	typeDiv.setAttribute('data-type-visual', badgeName);

	return typeDiv;
};

export { getTypeBadge };
