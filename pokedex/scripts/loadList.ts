import { Pokemon } from '../assets/types';
const pokemonList: HTMLOListElement = document.querySelector('main ol')!;

const emptyHtml =
	'<li><button><section><p></p></section><section><h2></h2></section><section><span></span><span></span></section></button></li>';

const loadEmptyList = (n: number) => {
	// shoutout aan github copilot
	pokemonList.innerHTML = emptyHtml.repeat(n);

	// const documentFragment = document.createDocumentFragment();
	// const button = document.createElement('button');

	// const idSection = document.createElement('section');
	// const nameSection = document.createElement('section');
	// const typeSection = document.createElement('section');
	// const imgSection = document.createElement('section');
	// const h2 = document.createElement('h2');
	// const img = document.createElement('img');
	// const img2 = document.createElement('img');

	// button.appendChild(idSection);
	// button.appendChild(nameSection);
	// button.appendChild(typeSection);

	// nameSection.appendChild(h2);
	// imgSection.appendChild(img);
	// imgSection.appendChild(img2);

	// documentFragment.appendChild(button);

	// for (let i = 0; i < n; i++) {
	//   const listItem = document.createElement('li');
	//   listItem.appendChild(button.cloneNode(true));
	//   pokemonList.appendChild(listItem);
	// 	pokemonList.insertAdjacentElement('beforeend', emptyHtml);
	// }
};

const populateList = (pokemonArr: Pokemon[]) => {
	pokemonArr.forEach((pokemon, i) => {
		setTimeout(() => {
			const button = pokemonList.children[i].children[0] as HTMLButtonElement;
			const idField = button.children[0].children[0] as HTMLParagraphElement;
			const nameField = button.children[1].children[0] as HTMLHeadingElement;
			const typeSection = button.children[2] as HTMLDivElement;

			idField.textContent = pokemon.id.toLocaleString('nl-NL', {
				minimumIntegerDigits: 3
			});
			nameField.textContent = pokemon.name;
			pokemon.types.forEach((type, i) => {
				typeSection.children[i].textContent = type.type.name;
				typeSection.children[i].classList.add(type.type.name);
			});
		}, i * 50);
	});
};

export { loadEmptyList, populateList };
