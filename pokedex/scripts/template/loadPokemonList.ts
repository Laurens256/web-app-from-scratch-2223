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

	// selecteer alle list items en child elements
	const listItems = pokemonList.children;
	const idFields = Array.from(listItems).map(
		(listItem) =>
			listItem.querySelector('section:first-of-type p') as HTMLParagraphElement
	);
	const nameFields = Array.from(listItems).map(
		(listItem) =>
			listItem.querySelector('section:nth-of-type(2) h2') as HTMLHeadingElement
	);
	const typeSections = Array.from(listItems).map(
		(listItem) => listItem.querySelector('section:last-of-type') as HTMLElement
	);

	pokemonArr.forEach((pokemon, i) => {
		setTimeout(() => {
			const idField = idFields[i];
			const nameField = nameFields[i];
			const typeSection = typeSections[i];

			idField.textContent = pokemon.id.toLocaleString('nl-NL', {
				minimumIntegerDigits: 3
			});

			nameField.textContent = pokemon.name;

			// generate type badges
			pokemon.types.forEach((type) => {
				const typeDiv = getTypeBadge(type.type.name);
				typeSection.appendChild(typeDiv);
			});
			listItems[i].classList.remove('loading', 'skeleton');
			listItems[i].querySelector('section:last-of-type div:not(.typebadge)')?.remove();
		}, i * 50);
	});
	// focus eerste pokemon in list
	focusPokemon(pokemonList, true);
};

export { generatePokemonList };
