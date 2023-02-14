import { Pokemon } from '../assets/types';
const pokemonList: HTMLOListElement = document.querySelector('main ol')!;

const loadEmptyList = (n: number) => {
	pokemonList.innerHTML = '';
	for (let i = 0; i < n; i++) {
		const listItem = document.createElement('li');
		const button = document.createElement('button');

		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
	}
};

const populateList = (pokemonArr: Pokemon[]) => {
	pokemonArr.forEach((pokemon: Pokemon, i) => {
		setTimeout(() => {
			const item = pokemonList.children[i].children[0] as HTMLButtonElement;
			item.textContent = pokemon.name;
		}, i * 50);
	});
};

export { loadEmptyList, populateList };
