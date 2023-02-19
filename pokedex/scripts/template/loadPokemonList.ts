import { Pokemon } from '../../assets/types';
import { getTypeBadge } from '../drawTypes';
import { focusPokemon } from '../manageListScroll';
import { loadTemplate } from './loadTemplate';

let pokemonList: HTMLOListElement;
const mainElement = document.querySelector('main');

// generate skeleton voor pokemon list
const generateListSkeleton = async (n: number) => {
	pokemonList = document.createElement('ol');
	pokemonList.classList.add('pokemonlist');
	const template = await loadTemplate('pokemon-list-item');

	// voegt alle lege list items toe aan pokemonList
	pokemonList.innerHTML = Array.from({ length: n }).map(() => template).join('');
	mainElement?.appendChild(pokemonList);
};

const generatePokemonList = async (n: number, data: Promise<Pokemon[]>) => {
	// generate skeleton
	await generateListSkeleton(n);
	// return;

	// wacht tot data binnen is
	const pokemonArr = await data;

	// shoutout ninadepina
	const listItems = Array.from(pokemonList.children).map((listItem) => ({
		listItem,
		idField: listItem.querySelector('section:first-of-type p') as HTMLParagraphElement,
		nameField: listItem.querySelector('section:nth-of-type(2) h2') as HTMLHeadingElement,
		typeSection: listItem.querySelector('section:last-of-type') as HTMLElement
	}));

	pokemonArr.forEach((pokemon, i) => {
		setTimeout(() => {
			const idField = listItems[i].idField;
			const nameField = listItems[i].nameField;
			const typeSection = listItems[i].typeSection;

			idField.textContent = pokemon.id.toLocaleString('nl-NL', {
				minimumIntegerDigits: 3
			});

			nameField.textContent = pokemon.name;

			// generate type badges
			pokemon.types.forEach((type) => {
				const typeDiv = getTypeBadge(type.type.name);
				typeSection.appendChild(typeDiv);
			});
			listItems[i].listItem.classList.remove('loading', 'skeleton');
			listItems[i].listItem.querySelector('section:last-of-type div:not(.typebadge)')?.remove();
		}, i * 50);
	});
	// focus eerste pokemon in list
	focusPokemon(pokemonList, true);
};

export { generatePokemonList };
