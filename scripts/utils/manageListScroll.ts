let pokemonList: HTMLOListElement;
let topBoundary = 0;
let bottomBoundary = 0;
let listItemHeight = 0;
let listItems: HTMLButtonElement[] = [];

const getVisibleItems = () => {
	const visibleItems = listItems.filter(
		(listItem) =>
			listItem.getBoundingClientRect().top >= topBoundary &&
			listItem.getBoundingClientRect().bottom <= bottomBoundary
	);
	return visibleItems;
};

// function om de list te laten scrollen als je binnen een marge van de boven- of ondergrens bent
const followPokemonScroll = () => {
	const visibleItems = getVisibleItems();

	const focusedItem = document.activeElement as HTMLButtonElement;
	const focusedItemIndex = visibleItems.indexOf(focusedItem);

	const scrollMarginDown = visibleItems.length > 5 ? 3 : 1;
	const scrollMarginUp = visibleItems.length > 5 ? 1 : 0;

	if (focusedItemIndex >= visibleItems.length - scrollMarginDown) {
		pokemonList.scrollTop += listItemHeight;
	} else if (focusedItemIndex <= scrollMarginUp) {
		pokemonList.scrollTop -= listItemHeight;
	}
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

// function om keyboard input te checken en te verwerken, uitiendelijk eigen util van maken
const checkKey = (e: KeyboardEvent) => {
	console.log('aaa');
	if (pokemonList && !pokemonList.contains(document.activeElement)) return;
	if (e.key === 'ArrowUp' || e.key === 'w') {
		e.preventDefault();
		moveArrow(-1);
	} else if (e.key === 'ArrowDown' || e.key === 's') {
		e.preventDefault();
		moveArrow(1);
	}
};

const checkScroll = () => {
	const visibleItems = getVisibleItems();

	if (visibleItems[0] !== listItems[0]) {
		pokemonList.classList.add('scrollableup');
	} else {
		pokemonList.classList.remove('scrollableup');
	}

	if (visibleItems[visibleItems.length - 1] !== listItems[listItems.length - 1]) {
		pokemonList.classList.add('scrollabledown');
	} else {
		pokemonList.classList.remove('scrollabledown');
	}
};

// function om pokemon 1 te focussen
const focusPokemon = (pokemonListParam: HTMLOListElement) => {
	const focusItem = pokemonListParam.querySelector('button') as HTMLButtonElement;
	pokemonList = pokemonListParam;
	listItems = Array.from(pokemonList.querySelectorAll('button'));
	calcBoundingRect();
	pokemonList.addEventListener('focusin', followPokemonScroll);

	// media query omdat de focus stijl voor mobile niet zo mooi is lol
	if (window.matchMedia('(min-width: 600px)').matches) {
		focusItem.focus();
		pokemonList.addEventListener('scroll', checkScroll);
		pokemonList.dispatchEvent(new Event('scroll'));
	}
};

// berekenen van de boven- en ondergrens van de list, gebeurt bij resize en init
const calcBoundingRect = () => {
	resizeEventListener();

	listItemHeight = listItems[0].getBoundingClientRect().height;
	topBoundary = pokemonList.getBoundingClientRect().top;
	bottomBoundary = pokemonList.getBoundingClientRect().bottom;
};

// zorg dat de eventlistener alleen aanwezig is als de list aanwezig is
const resizeEventListener = () => {
	const _pokemonList = document.querySelector('.pokemonlist') as HTMLOListElement;

	if (_pokemonList) {
		window.addEventListener('resize', calcBoundingRect);
	} else {
		window.removeEventListener('resize', calcBoundingRect);
	}
};

document.onkeydown = checkKey;

export { focusPokemon };
