import { FullPokemonDetails, PokemonTypes } from '../../public/types';
import { filters } from '../views/filterView';

const sortPokemonArray = (pokemonArr: FullPokemonDetails[], order: string) => {
	switch (order) {
		case 'numerical':
			pokemonArr.sort((a, b) => a.id - b.id);
			break;

		case 'alphabetical':
			pokemonArr.sort((a, b) =>
				a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
			);
			break;

		case 'lightest':
			pokemonArr.sort((a, b) => a.weight - b.weight);
			break;

		case 'smallest':
			pokemonArr.sort((a, b) => a.height - b.height);
			break;

		case 'type':
			// sorteer op type, dan op secundair type in volgorder van de array PokemonTypes
			pokemonArr.sort((a, b) => {
				const aType1 = a.types[0].type.name;
				const aType2 = a.types[1]?.type.name;
				const bType1 = b.types[0].type.name;
				const bType2 = b.types[1]?.type.name;

				const aType1Index = PokemonTypes.indexOf(aType1);
				const aType2Index = PokemonTypes.indexOf(aType2);
				const bType1Index = PokemonTypes.indexOf(bType1);
				const bType2Index = PokemonTypes.indexOf(bType2);

				if (aType1Index !== bType1Index) {
					return aType1Index - bType1Index;
				}
				if (aType2Index !== bType2Index) {
					return aType2Index - bType2Index;
				}
				return 0;
			});
			break;

		default:
			const habitat = new window.URLSearchParams(window.location.search).get('habitat');
			if (habitat) {
				window.history.replaceState({}, '', `${window.location.pathname}?order=numerical&habitat=${habitat}`);
			} else {
				window.history.replaceState({}, '', `${window.location.pathname}?order=numerical`);
			}
			break;
	}
	return pokemonArr;
};

const filterPokemonArray = (pokemonArr: FullPokemonDetails[], habitat: string = '') => {
	const possibleHabitats = filters.map(filter => filter.className);
	if (!possibleHabitats.includes(habitat)) {
		return pokemonArr;
	} else {
		return pokemonArr.filter(pokemon => pokemon.habitat.name === habitat);
	}
};

export { sortPokemonArray, filterPokemonArray };