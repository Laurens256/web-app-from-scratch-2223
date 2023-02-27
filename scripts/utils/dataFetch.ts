import { Pokemon, Url, Species, FullPokemonDetails } from '../../assets/types';

const baseApiUrl = 'https://pokeapi.co/api/v2/';
// const defaultRegion = 'national';
const defaultRegion = 'kanto';

// generieke functie om data op te halen
const getDataFromAPI = async (query: string) => {
	const url = query.includes('//') ? query : baseApiUrl + query;
	return await (await fetch(url)).json();
};

// functie om pokemon op te halen met naam ipv url, zo gedaan omdat types anders niet worden geleverd
const getPokemonData = async (urls: Url[], endpoint: string = 'pokemon') => {
	const promises: Promise<Pokemon>[] = urls.map(async (url) => {
		return await getDataFromAPI(`${baseApiUrl}${endpoint}/${url.name}`);
	});
	return Promise.all(promises);
};

// const getPokemonSpecies = async (urls: Url[]) => {
// 	const promises: Promise<Pokemon>[] = urls.map(async (url) => {
// 		return await getDataFromAPI(`${baseApiUrl}pokemon-species/${url.name}`);
// 	});
// 	return Promise.all(promises);
// };

// function om pokemon species op te halen en type toe te voegen. pokemon species endpoint wordt gekozen omdat hierbij de naam altijd accuraat is, bij de pokemon endpoint is dit niet altijd het geval
const getFullPokemonDetails = async (urls: Url[], name?: string) => {
	const promises = urls.map(async (url) => {
		const pokemonSpecies: Species = await getDataFromAPI(url.url);

		let types: Pokemon['types'];
		let sprites: Pokemon['sprites'];
		let weight: number, height: number;
		({ types, sprites, weight, height } = await getDataFromAPI(`${baseApiUrl}pokemon/${pokemonSpecies.id}`));

		const pokemon: FullPokemonDetails = {
			...pokemonSpecies,
			types: types,
			sprites: sprites,
			weight: weight,
			height: height
		};
		return pokemon;
	});
	return Promise.all(promises);
};

// functie om alle pokemon op te halen uit specifieke region
const getPokemonByRegion = async (regionStr: string = defaultRegion) => {
	// maakt een array met alle urls van pokemon
	const pokemonUrlArr: Url[] = (
		await getDataFromAPI(`pokedex/${regionStr}`)
	).pokemon_entries.map((entry: { pokemon_species: Url }) => entry.pokemon_species);

	const pokemonArr = getFullPokemonDetails(pokemonUrlArr);
	// const pokemonArr = getPokemonData(pokemonUrlArr);

	return { n: pokemonUrlArr.length, pokemonArr: pokemonArr };
};

export { getDataFromAPI, getPokemonByRegion, getFullPokemonDetails };
