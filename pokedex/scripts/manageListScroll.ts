let pokemonList: HTMLOListElement;
let topBoundary = 0;
let bottomBoundary = 0;
let listItems: HTMLButtonElement[] = [];

// function om de list te laten scrollen als je binnen een marge van de boven- of ondergrens bent
const followPokemonScroll = () => {
	const listItemHeight = listItems[0].getBoundingClientRect().height;
	const visibleItems = listItems.filter(
		(listItem) =>
			listItem.getBoundingClientRect().top >= topBoundary &&
			listItem.getBoundingClientRect().bottom <= bottomBoundary
	);

	const focusedItem = document.activeElement as HTMLButtonElement;
	const focusedItemIndex = visibleItems.indexOf(focusedItem);

	const scrollMargin = visibleItems.length > 5 ? 3 : 1;

	if (focusedItemIndex >= visibleItems.length - scrollMargin) {
		pokemonList.scrollTop += listItemHeight;
	} else if (focusedItemIndex <= scrollMargin - 1) {
		pokemonList.scrollTop -= listItemHeight;
	}
};

// remove event listener zodat deze niet meerdere keren actief is en zodat deze niet blijft bestaan als de list niet meer bestaat
const stopPokemonScroll = () => {
	pokemonList.removeEventListener('focusin', followPokemonScroll);
};

// verplaats het pijltje omhoog of omlaag
const moveArrow = (direction: number) => {
	const focusedItem = document.activeElement as HTMLButtonElement;
	const focusedItemIndex = listItems.indexOf(focusedItem);
	const nextItem = listItems[focusedItemIndex + direction];
	if (nextItem) {
		nextItem.focus();
		followPokemonScroll();
	}
};

// function om keyboard input te checken en te verwerken
const checkKey = (e: KeyboardEvent) => {
	if (pokemonList && !pokemonList.contains(document.activeElement)) return;
	if (e.key === 'ArrowUp' || e.key === 'w') {
		e.preventDefault();
		moveArrow(-1);
	} else if (e.key === 'ArrowDown' || e.key === 's') {
		e.preventDefault();
		moveArrow(1);
	}
};

// function om pokemon 1 te focussen
const focusPokemon = (pokemonListParam: HTMLOListElement, follow: boolean = false) => {
	const focusItem = pokemonListParam.querySelector('button') as HTMLButtonElement;
	pokemonList = pokemonListParam;
	listItems = Array.from(pokemonList.querySelectorAll('button'));
	calcBoundingRect();
	if (follow) {
		pokemonList.addEventListener('focusin', followPokemonScroll);
	}
	focusItem.focus();
};

// berekenen van de boven- en ondergrens van de list, gebeurt bij resize en init
const calcBoundingRect = () => {
	if(!pokemonList) return;
	topBoundary = pokemonList.getBoundingClientRect().top;
	bottomBoundary = pokemonList.getBoundingClientRect().bottom;
};

window.addEventListener('resize', calcBoundingRect);
document.onkeydown = checkKey;

export { focusPokemon };
