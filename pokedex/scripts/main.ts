import { Url, Region, Pokemon } from '../assets/types';

const rootElement = document.documentElement;

const pokemonList: HTMLOListElement = document.querySelector('main ol')!;

const defaultRegion = 'kanto';
const baseApiUrl = 'https://pokeapi.co/api/v2/';

// generieke functie om data op te halen
const getDataFromAPI = async (query: string) => {
	const url = query.includes('//') ? query : baseApiUrl + query;
	return await (await fetch(url)).json();
};

// functie om data op te halen van meerdere urls (type: Url[])
const getUrlData = async (urls: Url[]) => {
	const promises = urls.map(async (dataUrl) => {
		return await getDataFromAPI(dataUrl.url);
	});
	return Promise.all(promises);
};

// functie om alle pokemon op te halen uit specifieke region
const fetchPokemonByRegion = async (regionStr: string = defaultRegion) => {
	const pokemonEntryArr: { pokemon_species: Url }[] = (
		await getDataFromAPI(`pokedex/${regionStr}`)
	).pokemon_entries;

	// maak een array met alleen de type: Url van de pokemon
	const pokemonUrlArr = pokemonEntryArr.map((entry) => entry.pokemon_species);
	return await getUrlData(pokemonUrlArr);
};

// functie om alle pokemon uit een array te tonen in de DOM
const displayPokemonList = async (region: string = defaultRegion) => {
	const pokemonArr: Pokemon[] = await fetchPokemonByRegion(region);
	pokemonList.innerHTML = '';

	pokemonArr.forEach((pokemon: Pokemon, i) => {
		console.log(pokemon);
		setTimeout(() => {
			const listItem = document.createElement('li');
			// style the marker of the list item
			//@ts-ignore
			listItem.style.setProperty('--marker', `${i + 1}`);
			listItem.innerHTML = pokemon.name;
			pokemonList.appendChild(listItem);
		}, i * 50);
	});
};

displayPokemonList();
