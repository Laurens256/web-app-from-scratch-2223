import { Url, Region, Pokemon } from '../assets/types';
import { loadEmptyList, populateList } from './loadList';
import { loadTemplate } from './template/loadTemplate';

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
	const promises = urls.map(async (url) => {
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

	// loadEmptyList(pokemonEntryArr.length);

	// maak een array met alleen het type: Url van de pokemon
	const pokemonUrlArr = pokemonEntryArr.map((entry) => entry.pokemon_species);
	// pokemonArr = await getAllPokemon(pokemonUrlArr);
	// console.log(pokemonArr);
	// populateList(pokemonArr);
	return getAllPokemon(pokemonUrlArr);
};

const mainElement = document.querySelector('ol');
if (mainElement) {
	// mainElement.innerHTML = await loadTemplate();
}

const func = async () => {
	const allPokemon = await getPokemonByRegion();
	console.log(allPokemon);
	if (mainElement) {
		allPokemon.forEach(async (pokemon) => {
			mainElement.insertAdjacentHTML('beforeend',await loadTemplate('pokemon-list', pokemon))
		});
	}
};
func();
