import { getPokemonByRegion } from '../utils/dataFetch';
import { FullPokemonDetails } from '../../assets/types';
import { getTypeBadge } from '../utils/getTypeBadge';
import { focusListItem } from '../utils/manageListScroll';
import { loadTemplate } from './loadTemplate';
import { mainElement } from '../routing/router';
import { HeaderView } from '../views/headerView';

let fullPokemonList: FullPokemonDetails[] = [];

const ListView = async () => {
	mainElement.innerHTML = '';
	HeaderView('listview');

	// als de volledige nog niet is opgehaald, haal hem dan op
	if (fullPokemonList.length === 0) {
		let n: number, pokemonArr: Promise<FullPokemonDetails[]>;
		try {
			({ n, pokemonArr } = await getPokemonByRegion());
			await generatePokemonList(n, pokemonArr, getSortOrder());
		} catch (error) {
			listError();
		}
	} else {
		await generatePokemonList(fullPokemonList.length, fullPokemonList, getSortOrder());
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
	fullPokemonList = pokemonArr;

	// shoutout ninadepina
	const listItems = Array.from(pokemonList.children).map((listItem) => ({
		listItem,
		button: listItem.querySelector('button') as HTMLButtonElement,
		idField: listItem.querySelector('section:first-of-type p') as HTMLParagraphElement,
		nameField: listItem.querySelector('section:nth-of-type(2) h2') as HTMLHeadingElement,
		typeSection: listItem.querySelector('section:last-of-type') as HTMLElement
	}));

	// sorteer de pokemonArr op basis van query param
	if (order === 'numerical') {
		pokemonArr.sort((a, b) => a.id - b.id);
	} else if (order === 'alphabetical') {
		pokemonArr.sort((a, b) =>
			a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
		);
	} else if (order === 'lightest') {
		pokemonArr.sort((a, b) => a.weight - b.weight);
	} else if (order === 'smallest') {
		pokemonArr.sort((a, b) => a.height - b.height);
	} else {
		alert(`Sorting by "${order}" is not supported. Instead sorting by id.`);
		window.history.replaceState({}, '', `${window.location.pathname}?order=numerical`);
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
			window.history.pushState({pokemon: pokemon}, '', `/pokemon/${pokemon.name}`);
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
	console.log('errr');
};

const delay = (n: number) => {
	return new Promise((resolve) => setTimeout(resolve, n));
};

export { ListView };
