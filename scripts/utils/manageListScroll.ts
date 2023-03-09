import { setEventListeners, eventListenerObj } from './manageEventListeners';
import { playBeepSound } from './soundEffects';
import { genericListKeyDown } from './controls/genericListControls';

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
let lastFocusedItem!: HTMLButtonElement;
// verplaats het pijltje omhoog of omlaag
const moveArrow = (direction: number) => {
	if (isRunning) return;
	isRunning = true;
	const focusedItem = document.activeElement as HTMLButtonElement;

	if ((focusedItem === listItems[0] && direction === -1) || (focusedItem === listItems[listItems.length - 1] && direction === 1)) {
		isRunning = false;
		return;
	}

	if (listItems.includes(focusedItem)) {
		const focusedItemIndex = listItems.indexOf(focusedItem);
		const nextItem = listItems[focusedItemIndex + direction];
		if (nextItem) {
			nextItem.focus();
			lastFocusedItem = nextItem;
		}
	} else if (lastFocusedItem) {
		// focus laatst onthouden item
		lastFocusedItem.focus();
	} else {
		// focus op het midden van de lijst als er geen item geselecteerd is
		const visibleItems = getVisibleItems();
		visibleItems[Math.floor(visibleItems.length / 2)].focus();
	}
	playBeepSound();
	followScroll();
	setTimeout(() => {
		isRunning = false;
	}, 90);
};

// check of lijst omhoog of omlaag gescrolled kan worden
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

// function om list item te focussen gebaseerd op param
const focusListItem = (
	listParam: HTMLOListElement | HTMLUListElement,
	selectItem?: HTMLButtonElement
) => {
	const firstItem = listParam.querySelector('button') as HTMLButtonElement;
	list = listParam;
	listItems = Array.from(list.querySelectorAll('button'));
	calcBoundingRect();
	list.addEventListener('focusin', followScroll);

	const listeners: eventListenerObj[] = [{target: document, event: 'keydown', callback: genericListKeyDown}];
	setEventListeners(listeners);
	
	// media query omdat de focus stijl voor mobile niet zo mooi is lol
	if (window.matchMedia('(min-width: 600px)').matches) {
		selectItem ? selectItem.focus() : firstItem.focus();
		lastFocusedItem = document.activeElement as HTMLButtonElement;
		list.addEventListener('scroll', checkScroll);
		list.dispatchEvent(new Event('scroll'));
	} else {
		selectItem ? selectItem.scrollIntoView({
			behavior: 'auto',
			block: 'center',
			inline: 'center'
		}) : firstItem.scrollIntoView({
			behavior: 'auto',
			block: 'center',
			inline: 'center'
		});
	}
};

// berekenen van de boven- en ondergrens van de list, gebeurt bij resize en init
const calcBoundingRect = () => {
	listItemHeight = listItems[0].getBoundingClientRect().height;
	topBoundary = list.getBoundingClientRect().top;
	bottomBoundary = list.getBoundingClientRect().bottom;
};

export { focusListItem, moveArrow };
