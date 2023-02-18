import { Url, Region, Pokemon } from '../assets/types';
import { generatePokemonList } from './template/loadPokemonList';

const defaultRegion = 'kanto';
const baseApiUrl = 'https://pokeapi.co/api/v2/';

let pokemonArr: Pokemon[] = [];

// generieke functie om data op te halen
const getDataFromAPI = async (query: string) => {
	const url = query.includes('//') ? query : baseApiUrl + query;
	return await (await fetch(url)).json();
};

// functie om data op te halen van meerdere urls (type: Url[])
const getAllPokemon = async (urls: Url[]) => {
	const promises: Promise<Pokemon>[] = urls.map(async (url) => {
		return await getDataFromAPI(`${baseApiUrl}pokemon/${url.name}`);
	});

	return Promise.all(promises);
};

// functie om alle pokemon op te halen uit specifieke region
const getPokemonByRegion = async (regionStr: string = defaultRegion) => {
	// array met alle urls van pokemon
	const pokemonEntryArr: { pokemon_species: Url }[] = (
		await getDataFromAPI(`pokedex/${regionStr}`)
	).pokemon_entries;

	// maak een array met alleen het type: Url van de pokemon
	const pokemonUrlArr = pokemonEntryArr.map((entry) => entry.pokemon_species);
	const pokemonArr = getAllPokemon(pokemonUrlArr);

	return { n: pokemonEntryArr.length, promise: pokemonArr };
};

const func = async () => {
	const { n, promise } = await getPokemonByRegion();
	generatePokemonList(n, promise);
};

func();
