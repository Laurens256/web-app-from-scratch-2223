import { playBeepSound } from './soundEffects';

let list: HTMLOListElement | HTMLUListElement;
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
const followScroll = () => {
	const visibleItems = getVisibleItems();

	const focusedItem = document.activeElement as HTMLButtonElement;
	const focusedItemIndex = visibleItems.indexOf(focusedItem);

	const scrollMarginDown = visibleItems.length > 5 ? 3 : 1;
	const scrollMarginUp = visibleItems.length > 5 ? 1 : 0;

	if (focusedItemIndex >= visibleItems.length - scrollMarginDown) {
		list.scrollTop += listItemHeight;
	} else if (focusedItemIndex <= scrollMarginUp) {
		list.scrollTop -= listItemHeight;
	}
};

let isRunning = false;
// verplaats het pijltje omhoog of omlaag
const moveArrow = (direction: number) => {
	if (isRunning) return;
	isRunning = true;
	const focusedItem = document.activeElement as HTMLButtonElement;

	if((focusedItem === listItems[0] && direction === -1) || (focusedItem === listItems[listItems.length - 1] && direction === 1)) {
		isRunning = false;
		return;
	}

	if (listItems.includes(focusedItem)) {
		const focusedItemIndex = listItems.indexOf(focusedItem);
		const nextItem = listItems[focusedItemIndex + direction];
		if (nextItem) {
			nextItem.focus();
		}
	} else {
		const visibleItems = getVisibleItems();
		visibleItems[Math.floor(visibleItems.length / 2)].focus();
	}
	playBeepSound();
	followScroll();
	setTimeout(() => {
		isRunning = false;
	}, 90);
};

// function om keyboard input te checken en te verwerken, uitiendelijk eigen util van maken
const checkKey = (e: KeyboardEvent) => {
	if (e.key === 'ArrowUp') {
		e.preventDefault();
		moveArrow(-1);
	} else if (e.key === 'ArrowDown') {
		e.preventDefault();
		moveArrow(1);
	} else if (e.key === 'a') {
		const activeElement = document.activeElement;
		if (activeElement instanceof HTMLElement) {
			activeElement.click();
		}
	}
};

const checkScroll = () => {
	const visibleItems = getVisibleItems();

	if (visibleItems[0] !== listItems[0]) {
		list.classList.add('scrollableup');
	} else {
		list.classList.remove('scrollableup');
	}

	if (visibleItems[visibleItems.length - 1] !== listItems[listItems.length - 1]) {
		list.classList.add('scrollabledown');
	} else {
		list.classList.remove('scrollabledown');
	}
};

// function om list item 1 te focussen
const focusListItem = (
	listParam: HTMLOListElement | HTMLUListElement,
	selectItem?: HTMLButtonElement
) => {
	const firstItem = listParam.querySelector('button') as HTMLButtonElement;
	list = listParam;
	listItems = Array.from(list.querySelectorAll('button'));
	calcBoundingRect();
	list.addEventListener('focusin', followScroll);
	document.addEventListener('keydown', checkKey);

	// media query omdat de focus stijl voor mobile niet zo mooi is lol
	if (window.matchMedia('(min-width: 600px)').matches) {
		selectItem ? selectItem.focus() : firstItem.focus();
		list.addEventListener('scroll', checkScroll);
		list.dispatchEvent(new Event('scroll'));
	}
};

// berekenen van de boven- en ondergrens van de list, gebeurt bij resize en init
const calcBoundingRect = () => {
	listItemHeight = listItems[0].getBoundingClientRect().height;
	topBoundary = list.getBoundingClientRect().top;
	bottomBoundary = list.getBoundingClientRect().bottom;
};

const clearListEventListeners = () => {
	window.removeEventListener('resize', calcBoundingRect);
	document.removeEventListener('keydown', checkKey);
};

export { focusListItem, clearListEventListeners };
