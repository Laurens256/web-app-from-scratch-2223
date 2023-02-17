import { Pokemon, PokemonTypes } from '../assets/types';
import { getTypeBadge } from './drawTypes';
import { focusPokemon } from './manageListScroll';
const pokemonList: HTMLOListElement = document.querySelector('main ol')!;

const emptyHtml =
	'<li><button><section><p></p></section><section><h2></h2></section><section></section></button></li>';
	// '<li class="loading"><button><section><p></p></section><section><h2></h2></section><section></section></button></li>';

const loadEmptyList = (n: number) => {
	pokemonList.innerHTML = '';
	pokemonList.innerHTML = emptyHtml.repeat(n);
};

const populateList = (pokemonArr: Pokemon[]) => {
	const listItems = pokemonList.children;
	const idFields = Array.from(listItems).map(
		(listItem) =>
			listItem.querySelector('section:first-of-type p') as HTMLParagraphElement
	);
	const nameFields = Array.from(listItems).map(
		(listItem) =>
			listItem.querySelector('section:nth-of-type(2) h2') as HTMLHeadingElement
	);
	const typeSections = Array.from(listItems).map(
		(listItem) => listItem.querySelector('section:last-of-type') as HTMLElement
	);

	pokemonArr.forEach((pokemon, i) => {
		setTimeout(() => {
			const idField = idFields[i];
			const nameField = nameFields[i];
			const typeSection = typeSections[i];

			idField.textContent = pokemon.id.toLocaleString('nl-NL', {
				minimumIntegerDigits: 3
			});

			nameField.textContent = pokemon.name;

			// css manier (gradient)
			pokemon.types.forEach((type) => {
				const typeDiv = document.createElement('div');
				const typeSpan = document.createElement('span');
				typeDiv.classList.add('typebadge');
				typeDiv.classList.add(type.type.name);

				let badgeName = '';
				if (type.type.name === 'fighting') {
					badgeName = 'fight';
				} else if (type.type.name === 'psychic') {
					badgeName = 'psychc';
				} else if (type.type.name === 'electric') {
					badgeName = 'electr';
				} else if (!PokemonTypes.includes(type.type.name)) {
					badgeName = '???';
				} else {
					badgeName = type.type.name;
				}
				typeSpan.textContent = badgeName;

				nameField.textContent = pokemon.name;

				idField.textContent = pokemon.id.toLocaleString('nl-NL', {
					minimumIntegerDigits: 3
				});

				typeDiv.appendChild(typeSpan);
				typeSection.appendChild(typeDiv);
			});

			// js manier (canvas)
			// pokemon.types.forEach((type) => {
			// 	const typeDiv = document.createElement('div');
			// 	const typeBadge = getTypeBadge(type.type.name);
			// 	const typeSpan = document.createElement('span');

			// 	let badgeName = '';
			// 	if (type.type.name === 'fighting') {
			// 		badgeName = 'fight';
			// 	} else if (type.type.name === 'psychic') {
			// 		badgeName = 'psychc';
			// 	} else if (type.type.name === 'electric') {
			// 		badgeName = 'electr';
			// 	} else if (!PokemonTypes.includes(type.type.name)) {
			// 		badgeName = '???';
			// 	} else {
			// 		badgeName = type.type.name;
			// 	}
			// 	typeSpan.textContent = badgeName;

			// 	typeDiv.appendChild(typeSpan);
			// 	typeDiv.appendChild(typeBadge);

			// 	typeSection.appendChild(typeDiv);
			// });
		}, i * 50);
	});
	focusPokemon(pokemonList, true);
};

export { loadEmptyList, populateList };
