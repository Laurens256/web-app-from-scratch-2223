import { mainElement } from '../routing/router';
import { Pokemon, Species, regionPerGame, Url } from '../../assets/types';
import { getDataFromAPI } from '../utils/dataFetch';
import { loadTemplate } from './loadTemplate';
import { hectogramToPound, decimeterToFoot } from '../utils/convertUnits';
import { HeaderView } from './headerView';

//prettier-ignore
const balls = ['master', 'ultra', 'great', 'poke', 'safari', 'net', 'dive', 'nest', 'repeat', 'timer', 'luxury', 'premier', 'level', 'lure', 'moon', 'friend', 'love', 'heavy', 'fast', 'heal', 'quick', 'dusk', 'sport', 'park', 'dream', 'beast'];
const defaultSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/placeholder-ball.png`;

const DetailView = async () => {
	mainElement.innerHTML = '';
	HeaderView('detailview');

	const pokemon = loadPokemonData();
	populatePokemonDetail(pokemon);
};

const generateDetailSkeleton = async () => {
	const template = await loadTemplate('pokemonDetail');
	mainElement.innerHTML = template;
};

const loadPokemonData = async () => {
	let pokemon!: Pokemon;
	if (window.history.state && window.history.state.pokemon) {
		pokemon = window.history.state.pokemon;
	} else {
		const name = window.location.pathname.split('/').pop() as string;
		pokemon = await getDataFromAPI(`pokemon/${name}`);
	}
	return pokemon;
};

let errorState = false;
const populatePokemonDetail = async (pokemon: Pokemon | Promise<Pokemon>) => {
	await generateDetailSkeleton();
	let id: number,
		name: string,
		sprites: { front_default: string; front_shiny: string },
		height: number,
		weight: number,
		species: Url;

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

	backButton.addEventListener('click', backButtonLogic);

	try {
		({ id, name, sprites, height, weight, species } = await pokemon);
		errorState = false;
	} catch (error) {
		errorState = true;
		detailError();
		return;
	}

	sessionStorage.setItem('selectedPokemonId', JSON.stringify({ id: id }));

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
		}, { once: true }
	);

	// lol
	if (sprites.front_shiny && Math.random() < 1 / 8192) {
		pokemonImage.src = sprites.front_shiny;
	} else {
		pokemonImage.src = sprites.front_default;
	}

	pokemonDetail.classList.remove('loading-pokemon');

	const speciesData = await getDataFromAPI(species.url);

	const randomEggGroup =
		speciesData.egg_groups[Math.floor(Math.random() * speciesData.egg_groups.length)];

	if (randomEggGroup && !(randomEggGroup.name == 'no-eggs')) {
		pokemonSpecies.textContent = `${randomEggGroup.name.toUpperCase()} POKéMON`;
	}

	const randomFlavorTexts = speciesData.flavor_text_entries
		.filter((text: { language: { name: string } }) => text.language.name === 'en')
		.map((text: { flavor_text: string }) => text.flavor_text);

	const randomFlavorText =
		randomFlavorTexts[Math.floor(Math.random() * randomFlavorTexts.length)];

	pokemonFlavorText.textContent = randomFlavorText.replace(//g, ' ');

	pokemonDetail.classList.remove('loading-species');
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
	return {topSection,backButton,pokemonDetail, imageSection, pokemonId, pokemonName, pokemonSpecies, pokemonImage, pokemonHeight, pokemonWeight, pokemonFlavorText
	};
};

const detailError = () => {
	const { topSection, pokemonDetail, imageSection } = getHtmlElements();
	pokemonDetail.classList.remove('loading-pokemon');
	pokemonDetail.classList.remove('loading-species');
	imageSection.classList.remove('imgloading');
	pokemonDetail.classList.add('error');

	topSection.innerHTML = `<h2>Oops, something went wrong</h2><p>Try again later or try a different Pokémon</p>`;
};

const backButtonLogic = () => {
	if (errorState === false) {
		window.history.back();
	} else {
		window.history.replaceState(null, '', '/');
	}
};

export { DetailView };
