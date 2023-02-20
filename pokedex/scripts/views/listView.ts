import { getPokemonByRegion } from '../utils/dataFetch';
import { Pokemon } from '../../assets/types';
import { getTypeBadge } from '../utils/getTypeBadge';
import { focusPokemon } from '../utils/manageListScroll';
import { loadTemplate } from './loadTemplate';
import { mainElement } from '../routing/router';

let fullPokemonList: Pokemon[] = [];

const ListView = async () => {
	mainElement.innerHTML = '';

	// als de volledige nog niet is opgehaald, haal hem dan op
	if (fullPokemonList.length === 0) {
		const { n, promise } = await getPokemonByRegion();
		await generatePokemonList(n, promise);
		fullPokemonList = await promise;
	} else {
		await generatePokemonList(fullPokemonList.length, Promise.resolve(fullPokemonList));
	}
};

// generate skeleton voor pokemon list
const generateListSkeleton = async (n: number) => {
	const pokemonList = document.createElement('ol');
	pokemonList.classList.add('pokemonlist');
	const template = await loadTemplate('pokemonListItem');

	// voegt alle lege list items toe aan pokemonList
	pokemonList.innerHTML = Array.from({ length: n })
		.map(() => template)
		.join('');
	mainElement?.appendChild(pokemonList);
};

const generatePokemonList = async (
	n: number,
	data: Promise<Pokemon[]>,
	order?: string
) => {
	// generate skeleton
	await generateListSkeleton(n);
	const pokemonList = document.querySelector('ol.pokemonlist') as HTMLOListElement;

	const pokemonArr = await data;

	// shoutout ninadepina
	const listItems = Array.from(pokemonList.children).map((listItem) => ({
		listItem,
		button: listItem.querySelector('button') as HTMLButtonElement,
		idField: listItem.querySelector('section:first-of-type p') as HTMLParagraphElement,
		nameField: listItem.querySelector('section:nth-of-type(2) h2') as HTMLHeadingElement,
		typeSection: listItem.querySelector('section:last-of-type') as HTMLElement
	}));

	if (order === 'alphabetical') {
		pokemonArr.sort((a, b) =>
			a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
		);
	} else if (order === 'lightest') {
		pokemonArr.sort((a, b) => a.weight - b.weight);
	} else if (order === 'smallest') {
		pokemonArr.sort((a, b) => a.height - b.height);
	}

	pokemonArr.forEach((pokemon, i) => {
		setTimeout(() => {
			// haal alle elementen uit listItems array
			const listItem = listItems[i].listItem;
			const button = listItems[i].button;
			const idField = listItems[i].idField;
			const nameField = listItems[i].nameField;
			const typeSection = listItems[i].typeSection;

			// verwijder loading en skeleton class en verwijder lege placeholder div
			listItem.classList.remove('loading', 'skeleton');
			listItem.querySelector('section:last-of-type div:not(.typebadge)')?.remove();

			button.addEventListener('click', () => {
				window.history.pushState({}, '', `/pokemon/${pokemon.name}`);
				// window.location.hash = `/pokemon/${pokemon.name}`;
			});
			button.setAttribute('aria-label', `view details of ${pokemon.name}`);

			// voef id toe in structured format (001, 002, 003, etc.)
			idField.textContent = pokemon.id.toLocaleString('nl-NL', {
				minimumIntegerDigits: 3
			});

			nameField.textContent = pokemon.name;

			// generate type badges
			pokemon.types.forEach((type) => {
				const typeDiv = getTypeBadge(type.type.name);
				typeSection.appendChild(typeDiv);
			});
		}, i * 50);
	});
	// focus eerste pokemon in list en geef aan dat pijltje moet volgen
	focusPokemon(pokemonList, true);
};

export { ListView };
