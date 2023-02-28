import { Pokemon, Url, Species, FullPokemonDetails } from '../../assets/types';

const baseApiUrl = 'https://pokeapi.co/api/v2/';
// const defaultRegion = 'national';
const defaultRegion = 'kanto';

// generieke functie om data op te halen
const getDataFromAPI = async (query: string) => {
	const url = query.includes('//') ? query : baseApiUrl + query;
	return await (await fetch(url)).json();
};

// function om pokemon species op te halen en type toe te voegen. pokemon species endpoint wordt gekozen omdat hierbij de naam altijd accuraat is, bij de pokemon endpoint is dit niet altijd het geval
const getFullPokemonDetails = async (names: string[]) => {
	const promises = names.map(async (name) => {
		const pokemonSpecies: Species = await getDataFromAPI(`pokemon-species/${name}`);
		const pokemon: Pokemon = await getDataFromAPI(`pokemon/${pokemonSpecies.id}`);

		const fullPokemonDetails: FullPokemonDetails = {
			...pokemonSpecies,
			types: pokemon.types,
			sprites: pokemon.sprites,
			weight: pokemon.weight,
			height: pokemon.height
		};
		return fullPokemonDetails;
	});
	return Promise.all(promises);
};

// functie om alle pokemon op te halen uit specifieke region
const getPokemonByRegion = async (regionStr: string = defaultRegion) => {
	// maakt een array met alle urls van pokemon
	const pokemonNameArr: string[] = (
		await getDataFromAPI(`pokedex/${regionStr}`)
	).pokemon_entries.map((entry: { pokemon_species: Url }) => entry.pokemon_species.name);

	const pokemonArr = getFullPokemonDetails(pokemonNameArr);

	return { n: pokemonNameArr.length, pokemonArr: pokemonArr };
};

export { getPokemonByRegion, getFullPokemonDetails };
