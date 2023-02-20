import { mainElement } from '../routing/router';
import { Pokemon } from '../../assets/types';
import { getDataFromAPI } from '../utils/dataFetch';
import { loadTemplate } from './loadTemplate';

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

const populatePokemonDetail = async (_pokemon: Pokemon | Promise<Pokemon>) => {
	await generateDetailSkeleton();
	const pokemon = await _pokemon;
	const pokemonDetail = document.querySelector('article.pokemondetail') as HTMLElement;
	const topSection = pokemonDetail.children[0] as HTMLElement;
	const bottomSection = pokemonDetail.children[1] as HTMLElement;

	const pokemonId = topSection.querySelector('div p') as HTMLParagraphElement;
	const pokemonName = topSection.querySelector('div h2') as HTMLHeadingElement;
	const pokemonSpecies = topSection.querySelector('p.species') as HTMLHeadingElement;
	const pokemonImage = topSection.querySelector('img') as HTMLImageElement;
	const pokemonHeight = topSection.querySelector('p.height') as HTMLParagraphElement;
	const pokemonWeight = topSection.querySelector('p.weight') as HTMLParagraphElement;
	// const pokemonTypes = pokemonDetail.querySelector('section.types') as HTMLElement;

	pokemonId.textContent = `No
		${pokemon.id.toLocaleString('nl-NL', {
			minimumIntegerDigits: 3
		})}`;
	pokemonName.textContent = pokemon.name;
	pokemonImage.addEventListener(
		'load',
		() => {
			pokemonImage.alt = pokemon.name;
		},
		{ once: true }
	);

	pokemonImage.addEventListener(
		'error',
		() => {
			pokemonImage.src = defaultSprite.replace(
				'placeholder',
				balls[Math.floor(Math.random() * balls.length)]
			);
			pokemonImage.alt = 'master ball';
		},
		{ once: true }
	);
	pokemonImage.src = pokemon.sprites.front_default;
	pokemonSpecies.textContent = pokemon.species.name;
	pokemonHeight.textContent = pokemon.height.toString();
	pokemonWeight.textContent = pokemon.weight.toString();
};

export { DetailView };
