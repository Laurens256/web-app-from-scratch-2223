import { mainElement } from '../routing/router';
import { Pokemon, Species, regionPerGame } from '../../assets/types';
import { getDataFromAPI } from '../utils/dataFetch';
import { loadTemplate } from './loadTemplate';
import { hectogramToPound, decimeterToFoot } from '../utils/convertUnits';

//prettier-ignore
const balls = ['master', 'ultra', 'great', 'poke', 'safari', 'net', 'dive', 'nest', 'repeat', 'timer', 'luxury', 'premier', 'level', 'lure', 'moon', 'friend', 'love', 'heavy', 'fast', 'heal', 'quick', 'dusk', 'sport', 'park', 'dream', 'beast'];
const defaultSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/placeholder-ball.png`;

const DetailView = async () => {
	mainElement.innerHTML = '';

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

const populatePokemonDetail = async (pokemon: Pokemon | Promise<Pokemon>) => {
	await generateDetailSkeleton();
	const { id, name, sprites, height, weight, species } = await pokemon;

	const {
		topSection,
		pokemonId,
		pokemonName,
		pokemonImage,
		pokemonHeight,
		pokemonWeight,
		pokemonFlavorText
	} = getHtmlElements();

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
		topSection.appendChild(pokemonImage);
		}, { once: true }
	);

	//prettier-ignore
	pokemonImage.addEventListener('error', () => {
			const ball = balls[Math.floor(Math.random() * balls.length)];
			pokemonImage.src = defaultSprite.replace('placeholder', ball);
			pokemonImage.alt = `${ball} ball`;
			topSection.appendChild(pokemonImage);
		}, { once: true }
	);

	// lol
	if (sprites.front_shiny && Math.random() < 1 / 8192) {
		pokemonImage.src = sprites.front_shiny;
	} else {
		pokemonImage.src = sprites.front_default;
	}

	const speciesData = await getDataFromAPI(species.url);
	console.log(species);

	const randomFlavorTexts = speciesData.flavor_text_entries
		.filter((text: { language: { name: string } }) => text.language.name === 'en')
		.map((text: { flavor_text: string }) => text.flavor_text);

	const randomFlavorText =
		randomFlavorTexts[Math.floor(Math.random() * randomFlavorTexts.length)];

	pokemonFlavorText.textContent = randomFlavorText.replace(//g, ' ');
};



const getHtmlElements = () => {
	const pokemonDetail = document.querySelector('article.pokemondetail') as HTMLElement;
	const topSection = pokemonDetail.children[0] as HTMLElement;
	const bottomSection = pokemonDetail.children[1] as HTMLElement;

	const pokemonId = topSection.querySelector('div p') as HTMLParagraphElement;
	const pokemonName = topSection.querySelector('div h2') as HTMLHeadingElement;
	const pokemonImage = document.createElement('img') as HTMLImageElement;
	const pokemonHeight = topSection.querySelector('p.height') as HTMLParagraphElement;
	const pokemonWeight = topSection.querySelector('p.weight') as HTMLParagraphElement;
	const pokemonFlavorText = bottomSection.querySelector(
		'p.flavortext'
	) as HTMLParagraphElement;

	//prettier-ignore
	return {
		topSection, pokemonId, pokemonName, pokemonImage, pokemonHeight, pokemonWeight, pokemonFlavorText
	};
};

export { DetailView };
