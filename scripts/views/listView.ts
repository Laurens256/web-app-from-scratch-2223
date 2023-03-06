import { getPokemonByRegion } from '../utils/dataFetch';
import { FullPokemonDetails, PokemonTypes } from '../../assets/types';
import { getTypeBadge } from '../utils/getTypeBadge';
import { focusListItem } from '../utils/manageListScroll';
import { loadTemplate } from './loadTemplate';
import { mainElement } from '../routing/router';

const ListView = async () => {
	mainElement.innerHTML = '';
		try {
			const { n, pokemonArr } = await getPokemonByRegion();
			await generatePokemonList(n, pokemonArr, getSortOrder());
		} catch (error) {
			listError();
		}
};

// generate skeleton voor pokemon list
const generateListSkeleton = async (n: number) => {
	const pokemonList = document.createElement('ol');
	pokemonList.classList.add('pokemonlist', 'select-list');
	pokemonList.id = 'listview';
	const template = await loadTemplate('pokemonListItem');

	// voegt alle lege list items toe aan pokemonList
	pokemonList.innerHTML = Array.from({ length: n })
		.map(() => template)
		.join('');
	mainElement?.appendChild(pokemonList);
};

const generatePokemonList = async (
	n: number,
	data: FullPokemonDetails[] | Promise<FullPokemonDetails[]>,
	order?: string
) => {
	const loadDelay = data instanceof Promise ? true : false;

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
			pokemonArr.sort((a, b) => {
				const aType1 = a.types[0].type.name;
				const aType2 = a.types[1]?.type.name;
				const bType1 = b.types[0].type.name;
				const bType2 = b.types[1]?.type.name;

				if (aType1 === bType1) {
					return aType2?.localeCompare(bType2, undefined, {
						sensitivity: 'base'
					})!;
				} else {
					return aType1.localeCompare(bType1, undefined, { sensitivity: 'base' });
				}
			});
			break;

		default:
			window.history.replaceState({}, '', `${window.location.pathname}?order=numerical`)
			break;
	}

	// zorgt ervoor dat de eerste pokemon in de lijst gefocused wordt, of degene van de vorige pagina
	let firstLoaded = false;
	let focusLocked = false;
	const selectedPokemonJson = sessionStorage.getItem('selectedPokemonId');
	for (const [i, pokemon] of pokemonArr.entries()) {
		if (firstLoaded && !focusLocked && !selectedPokemonJson) {
			focusLocked = true;
			focusListItem(pokemonList);
		}
		if (loadDelay) {
			await delay(50);
		}

		const { listItem, button, idField, nameField, typeSection } = listItems[i];

		// verwijder loading en skeleton class en verwijder lege placeholder div
		listItem.classList.remove('loading', 'skeleton');
		listItem.querySelector('section:last-of-type div:not(.typebadge)')?.remove();

		button.addEventListener('click', () => {
			window.history.pushState({ pokemon: pokemon }, '', `/pokemon/${pokemon.name}`);
		});
		button.setAttribute('aria-label', `view details of ${pokemon.name}`);
		button.setAttribute('data-id', pokemon.id.toString());

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
		firstLoaded = true;
	}

	if (selectedPokemonJson) {
		const selectedPokemonId = JSON.parse(selectedPokemonJson).id;
		sessionStorage.removeItem('selectedPokemonId');

		const selectItem = pokemonList.querySelector(
			`button[data-id="${selectedPokemonId}"]`
		) as HTMLButtonElement;
		if (selectItem) {
			focusListItem(pokemonList, selectItem);
		} else {
			focusListItem(pokemonList);
		}
	}
};

const getSortOrder = () => {
	const order = new URLSearchParams(window.location.search).get('order');
	if (!order) {
		history.replaceState({}, '', `${window.location.pathname}?order=numerical`);
	}
	return order || 'numerical';
};

const listError = () => {
	
};

const delay = (n: number) => {
	return new Promise((resolve) => setTimeout(resolve, n));
};

export { ListView };
