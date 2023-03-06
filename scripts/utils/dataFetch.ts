import { Url, FullPokemonDetails, Species, Pokemon, errorDetails } from '../../assets/types';

const baseApiUrl = 'https://pokeapi.co/api/v2/';
// const defaultRegion = 'national';
const defaultRegion = 'kanto';
let pokemonArr: FullPokemonDetails[] | Promise<FullPokemonDetails[]> = [];

// generieke functie om data op te halen
const getDataFromAPI = async (query: string) => {
	const url = query.includes('//') ? query : baseApiUrl + query;
	return await (await fetch(url)).json();
};


// function om pokemon species op te halen en type toe te voegen. pokemon species endpoint wordt gekozen omdat hierbij de naam altijd accuraat is, bij de pokemon endpoint is dit niet altijd het geval
const getFullPokemonDetails = async (names: string[]) => {
	const promises = names.map(async (name) => {
		try {
			const { id, egg_groups, flavor_text_entries, habitat }: Species = await getDataFromAPI(`pokemon-species/${name}`);
			const { types, sprites, weight, height }: Pokemon = await getDataFromAPI(`pokemon/${id}`);

			const fullPokemonDetails: FullPokemonDetails = {
				egg_groups: egg_groups,
				flavor_text_entries: flavor_text_entries,
				habitat: habitat,
				id: id,
				name: name,
				types: types,
				sprites: sprites,
				weight: weight,
				height: height
			};


			return fullPokemonDetails;
		} catch {
			return { ...errorDetails, name };
		}
	})
	return Promise.all(promises);
};

// functie om alle pokemon op te halen uit specifieke region
const getPokemonByRegion = async (regionStr: string = defaultRegion) => {
	// maakt een array met alle urls van pokemon
	const pokemonNameArr: string[] = (
		await getDataFromAPI(`pokedex/${regionStr}`)
	).pokemon_entries.map((entry: { pokemon_species: Url }) => entry.pokemon_species.name);

	if (pokemonArr instanceof Promise || pokemonArr.length) {
		return { n: pokemonNameArr.length, pokemonArr: await pokemonArr };
	}

	pokemonNameArr[5] = 'gerbjhgjhd'

	pokemonArr = getFullPokemonDetails(pokemonNameArr);

	return { n: pokemonNameArr.length, pokemonArr: pokemonArr };
};

export { getPokemonByRegion, getFullPokemonDetails };
