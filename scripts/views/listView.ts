import { getPokemonByRegion } from '../utils/dataFetch';
import { FullPokemonDetails } from '../../public/types';
import { getTypeBadge } from '../utils/getTypeBadge';
import { focusListItem } from '../utils/manageListScroll';
import { loadTemplate } from './loadTemplate';
import { mainElement } from '../routing/router';
import { sortPokemonArray, filterPokemonArray } from '../utils/filterUtils';
import { delay } from '../utils/generalHelpers';
import { setEventListeners, eventListenerObj } from '../utils/manageEventListeners';
import { listViewKeyDown } from '../utils/controls/listViewControls';

let pokemonListElement: HTMLOListElement;
let displayedPokemon: FullPokemonDetails[] = [];

const ListView = async () => {
	mainElement.innerHTML = '';
	try {
		const { n, pokemonArr } = await getPokemonByRegion();
		const { order, habitat } = getQueryParams();
		sessionStorage.setItem('order', order);
		sessionStorage.setItem('habitat', habitat || '');
		await generatePokemonList(n, pokemonArr, order, habitat);
	} catch (error) {
		// listError();
	}
};

// generate skeleton voor pokemon list
const generateListSkeleton = async (n: number) => {
	pokemonListElement = document.createElement('ol');
	pokemonListElement.classList.add('pokemonlist', 'select-list');
	pokemonListElement.id = 'listview';
	const template = await loadTemplate('pokemonListItem');

	// voegt alle lege list items toe aan pokemonList
	pokemonListElement.innerHTML = Array.from({ length: n })
		.map(() => template)
		.join('');
	mainElement?.appendChild(pokemonListElement);
};

const removeExcessSkeleton = (n: number) => {
	// verwijder alle overbodige list items. wordt gedaan wanneer er is gefilterd en er dus minder pokemon zijn
	const listItems = Array.from(pokemonListElement.children);
	listItems.splice(n, listItems.length - n).forEach(listItem => listItem.remove());
};

const generatePokemonList = async (
	n: number,
	data: FullPokemonDetails[] | Promise<FullPokemonDetails[]>,
	order: string,
	habitat: string | null
) => {
	// check of een pokemon al een keer geselecteerd is, zo ja, laad de pagina meteen. Zorgt ervoor dat die laad animatie niet weer zo lang duurt
	const selectedPokemonId = sessionStorage.getItem('selectedPokemonId');
	const loadDelay = data instanceof Promise && !(selectedPokemonId) ? true : false;

	await generateListSkeleton(n);

	// await data en sorteer deze op de juiste volgorde
	const rawPokemonArr = await data;
	let filteredPokemonArr = rawPokemonArr;
	if (habitat) {
		filteredPokemonArr = filterPokemonArray(rawPokemonArr, habitat);
		removeExcessSkeleton(filteredPokemonArr.length);
	}
	const pokemonArr = sortPokemonArray(filteredPokemonArr, order);
	displayedPokemon = pokemonArr;

	// shoutout ninadepina
	const listItems = Array.from(pokemonListElement.children).map((listItem) => ({
		listItem,
		anchor: listItem.querySelector('a') as HTMLAnchorElement,
		idField: listItem.querySelector('section:first-of-type p') as HTMLParagraphElement,
		nameField: listItem.querySelector('section:nth-of-type(2) h2') as HTMLHeadingElement,
		typeSection: listItem.querySelector('section:last-of-type') as HTMLElement
	}));

	document.title = 'POKéDEX';

	const listeners: eventListenerObj[] = [{target: document, event: 'keydown', callback: listViewKeyDown}];
	setEventListeners(listeners);

	// zorgt ervoor dat de eerste pokemon in de lijst gefocused wordt, of degene van de vorige pagina
	let firstLoaded = false;
	let focusLocked = false;
	for (const [i, pokemon] of pokemonArr.entries()) {

		const { listItem, anchor, idField, nameField, typeSection } = listItems[i];

		if (pokemon.id === 0) {
			listError(pokemon.name, listItems[i]);
			continue;
		}

		if (firstLoaded && !focusLocked && !selectedPokemonId) {
			focusLocked = true;
			focusListItem(pokemonListElement);
		}
		if (loadDelay) {
			await delay(50);
		}

		// verwijder loading en skeleton class en verwijder lege placeholder div
		listItem.classList.remove('loading', 'skeleton');
		listItem.querySelector('section:last-of-type div:not(.typebadge)')?.remove();

		anchor.href = `/pokemon/${pokemon.name}`;
		anchor.addEventListener('click', (e) => {
			e.preventDefault();
			window.history.pushState({ pokemon: pokemon }, '', anchor.href);
		});
		anchor.setAttribute('aria-label', `view details of ${pokemon.name}`);
		anchor.setAttribute('data-id', pokemon.id.toString());

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

	if (selectedPokemonId) {
		sessionStorage.removeItem('selectedPokemonId');

		const selectItem: HTMLAnchorElement | null = pokemonListElement.querySelector(
			`a[data-id="${selectedPokemonId}"]`
		);
		if (selectItem) {
			focusListItem(pokemonListElement, selectItem);
		} else {
			focusListItem(pokemonListElement);
		}
	}
};

const defaultSort = 'numerical';
// haalt de query params uit de url of haal ze uit sessionstorage
const getQueryParams = () => {
	const URLSearchParams = new window.URLSearchParams(window.location.search);
	let order = URLSearchParams.get('order');
	let habitat = URLSearchParams.get('habitat');
	let queryParams = '';

	if (!order) {
		order = sessionStorage.getItem('order');
		queryParams = `?order=${order || defaultSort}`;

		if (habitat) {
			queryParams += `&habitat=${habitat}`;
		}
		window.history.replaceState({}, '', queryParams);
	}
	return { order: order || defaultSort, habitat: habitat };
};

const listError = (name: string, listItems: {
	listItem: Element;
	anchor: HTMLAnchorElement;
	idField: HTMLParagraphElement;
	nameField: HTMLHeadingElement;
	typeSection: HTMLElement;
}) => {
	const { listItem, anchor, nameField, typeSection } = listItems;
	listItem.className = 'error';
	anchor.href = '';

	nameField.textContent = name;
	const typeDiv = getTypeBadge()
	typeSection.insertAdjacentElement('afterbegin', typeDiv);
};

// functie om de volgende pokemon te krijgen, wordt aangeroepen vanuit de detailview
const getAdjacentPokemon = (currentPokemon: string | undefined) => {
	const currentPokemonIndex = displayedPokemon.findIndex(
		(pokemon) => pokemon.name === currentPokemon
	);
	const nextPokemon = displayedPokemon[currentPokemonIndex + 1];
	const previousPokemon = displayedPokemon[currentPokemonIndex - 1];
	return {previousPokemon, nextPokemon};
};


export { ListView, getAdjacentPokemon };
