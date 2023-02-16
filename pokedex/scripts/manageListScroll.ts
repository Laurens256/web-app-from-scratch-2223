const pokemonList = document.querySelector('.pokemonlist') as HTMLOListElement;
const topListBoundary = pokemonList.getBoundingClientRect().top;
const bottomListBoundary = pokemonList.getBoundingClientRect().bottom;
let listItems: HTMLButtonElement[] = [];

const focusOnPokemon = () => {
	if (listItems.length < 1) {
		listItems = Array.from(pokemonList.querySelectorAll('button'));
	}

	const visibleItems = listItems.filter(
		(listItem) =>
			listItem.getBoundingClientRect().top >= topListBoundary &&
			listItem.getBoundingClientRect().bottom <= bottomListBoundary
	);

	console.log(visibleItems);
};

pokemonList.addEventListener('scroll', focusOnPokemon);

const blah = () => {};

export { blah };
