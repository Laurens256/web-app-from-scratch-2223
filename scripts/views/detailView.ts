import { mainElement } from '../routing/router';
import { FullPokemonDetails, Url } from '../../public/types';
import { getFullPokemonDetails } from '../utils/dataFetch';
import { loadTemplate } from './loadTemplate';
import { hectogramToPound, decimeterToFoot } from '../utils/smallHelpers';
import { handleKeyDown } from '../utils/controls/handleDetailControls';
import { routes } from '../routing/routes';
import { getNextPokemon } from './listView';
import { playCry } from '../utils/controls/handleDetailControls';
import { playBgMusic } from '../utils/soundEffects';

//prettier-ignore
const balls = ['master', 'ultra', 'great', 'poke', 'safari', 'net', 'dive', 'nest', 'repeat', 'timer', 'luxury', 'premier', 'level', 'lure', 'moon', 'friend', 'love', 'heavy', 'fast', 'heal', 'quick', 'dusk', 'sport', 'park', 'dream', 'beast'];
const defaultSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/placeholder-ball.png`;

const DetailView = async () => {
	mainElement.innerHTML = '';

	const fullPokemonDetails = loadPokemonData();
	populatePokemonDetail(fullPokemonDetails);
};

// laad template in
const generateDetailSkeleton = async () => {
	const template = await loadTemplate('pokemonDetail');
	mainElement.innerHTML = template;
};

// probeert pokemon data uit history state te halen zodat er niet opnieuw gefetched hoeft te worden, anders wel fetchen
const loadPokemonData = async () => {
	let fullPokemonDetails!: FullPokemonDetails;
	if (window.history.state && window.history.state.pokemon) {
		fullPokemonDetails = window.history.state.pokemon;
	} else {
		const name = window.location.pathname.split('/').pop() as string;
		fullPokemonDetails = (await getFullPokemonDetails([name]))[0];
	}
	return fullPokemonDetails;
};

const populatePokemonDetail = async (
	fullPokemonDetails: FullPokemonDetails | Promise<FullPokemonDetails>
) => {
	// wacht tot skeleton is geladen
	await generateDetailSkeleton();
	let id: number,
		name: string,
		sprites: { front_default: string; front_shiny: string },
		height: number,
		weight: number,
		egg_groups: Url[],
		flavor_text_entries: { flavor_text: string; language: { name: string } }[];

	playBgMusic(true, true);

	// haal html elementen op
	const {
		backButton,
		pokemonDetail,
		imageSection,
		pokemonId,
		pokemonName,
		pokemonSpecies,
		pokemonImage,
		pokemonHeight,
		pokemonWeight,
		pokemonFlavorText
	} = getHtmlElements();

	backButton.addEventListener('click', () => {
		const listViewRoute = routes.find((route) => route.viewName === 'listview');
		const sortOrder = sessionStorage.getItem('order') || 'numerical';
		const habitat = sessionStorage.getItem('habitat') || '';
		const params = new URLSearchParams({ order: sortOrder });

		if (habitat !== '') {
			params.append('habitat', habitat);
		}

		window.history.replaceState({}, '', `${listViewRoute?.path}?${params.toString()}`)
	});

	// await de promise zodat de data kan worden ingeladen. Als de promise rejected wordt, error state en return
	try {
		({ id, name, sprites, height, weight, egg_groups, flavor_text_entries } =
			await fullPokemonDetails);
		if (id === 0) throw new Error();
	} catch (error) {
		detailError();
		return;
	}

	// check of volgende pokemon kan worden geladen, zo niet, disable de control
	checkNextPokemon(name);

	sessionStorage.setItem('selectedPokemonId', id.toString());

	pokemonId.textContent = `No
		${id.toLocaleString('nl-NL', {
		minimumIntegerDigits: 3
	})}`;
	pokemonName.textContent = name;

	pokemonHeight.textContent = decimeterToFoot(height);
	pokemonWeight.textContent = hectogramToPound(weight);

	//prettier-ignore
	pokemonImage.addEventListener('load', () => {
		pokemonImage.alt = name;
		imageSection.appendChild(pokemonImage);
		imageSection.classList.remove('imgloading');
	}, { once: true }
	);

	//prettier-ignore
	pokemonImage.addEventListener('error', () => {
		const ball = balls[Math.floor(Math.random() * balls.length)];
		pokemonImage.src = defaultSprite.replace('placeholder', ball);
		pokemonImage.alt = `${ball} ball`;
		imageSection.appendChild(pokemonImage);
		imageSection.classList.remove('imgloading');


		pokemonImage.addEventListener('error', () => {
			pokemonImage.src = '';
			pokemonImage.alt = '';
		}, { once: true });
	}, { once: true }
	);

	// lol
	if (sprites.front_shiny && Math.random() < 1 / 8192) {
		pokemonImage.src = sprites.front_shiny;
	} else {
		pokemonImage.src = sprites.front_default;
	}

	// kies een egg group voor de ondertitel
	const randomEggGroup = egg_groups[Math.floor(Math.random() * egg_groups.length)];

	if (randomEggGroup && !(randomEggGroup.name == 'no-eggs')) {
		pokemonSpecies.textContent = `${randomEggGroup.name.toUpperCase()} POKéMON`;
	}

	// kies een van de engelse flavor texts
	const flavorTexts = flavor_text_entries
		.filter((text: { language: { name: string } }) => text.language.name === 'en')
		.map((text: { flavor_text: string }) => text.flavor_text);

	const randomFlavorText =
		flavorTexts[Math.floor(Math.random() * flavorTexts.length)];

	// vervang een of ander raar karakter wat in veel flavor texts staat met een spatie
	pokemonFlavorText.textContent = randomFlavorText.replace(//g, ' ');

	document.addEventListener('keydown', handleKeyDown);
	playCry(false);

	pokemonDetail.classList.remove('loading');
	document.title = `POKéDEX | ${name.toUpperCase()}`;
};

const getHtmlElements = () => {
	const backButton = document.querySelector('button.back') as HTMLButtonElement;
	const pokemonDetail = document.querySelector('article.pokemondetail') as HTMLElement;
	const topSection = pokemonDetail.children[0] as HTMLElement;
	const bottomSection = pokemonDetail.children[1] as HTMLElement;

	const imageSection = topSection.querySelector('section:last-of-type') as HTMLElement;
	const pokemonId = topSection.querySelector('div p') as HTMLParagraphElement;
	const pokemonName = topSection.querySelector('div h2') as HTMLHeadingElement;
	const pokemonSpecies = topSection.querySelector('p.species') as HTMLParagraphElement;
	const pokemonImage = document.createElement('img') as HTMLImageElement;
	const pokemonHeight = topSection.querySelector('p.height') as HTMLParagraphElement;
	const pokemonWeight = topSection.querySelector('p.weight') as HTMLParagraphElement;
	const pokemonFlavorText = bottomSection.querySelector(
		'p.flavortext'
	) as HTMLParagraphElement;

	//prettier-ignore
	return {
		topSection, backButton, pokemonDetail, imageSection, pokemonId, pokemonName, pokemonSpecies, pokemonImage, pokemonHeight, pokemonWeight, pokemonFlavorText
	};
};

const clearDetailEventListeners = () => {
	document.removeEventListener('keydown', handleKeyDown);
};

let nextExists = true
let previousExists = true
const checkNextPokemon = (currentPokemon: string) => {
	const { previousPokemon, nextPokemon } = getNextPokemon(currentPokemon);
	const nextButton = document.querySelector('li.control-icon.d-pad') as HTMLLIElement;

	previousPokemon ? previousExists = true : previousExists = false
	nextPokemon ? nextExists = true : nextExists = false

	if (!previousExists && !nextExists) {
		nextButton.remove();
	} else if (!previousExists) {
		nextButton.classList.remove('left');
	} else if (!nextExists) {
		nextButton.classList.remove('right');
	} else {
		nextButton.classList.add('left');
		nextButton.classList.add('right');
	}
};

// function om naar de volgende pokemon uit de lijst te gaan
const goToAdjacentPokemon = (direction: 1 | -1) => {
	const currentPokemon = window.location.pathname.split('/').pop();
	const { previousPokemon, nextPokemon } = getNextPokemon(currentPokemon);
	if (nextPokemon && direction === 1) {
		window.history.pushState({ pokemon: nextPokemon }, '', `/pokemon/${nextPokemon.name}`);
	} else if (previousPokemon) {
		window.history.pushState({ pokemon: previousPokemon }, '', `/pokemon/${previousPokemon.name}`);
	}
};

const detailError = () => {
	const { topSection, pokemonDetail, imageSection } = getHtmlElements();
	pokemonDetail.classList.remove('loading');
	imageSection.classList.remove('imgloading');
	pokemonDetail.classList.add('error');

	topSection.innerHTML = `<h2>Oops, something went wrong</h2><p>Try again later or try a different Pokémon</p>`;
};

export { DetailView, clearDetailEventListeners, goToAdjacentPokemon, nextExists, previousExists };
