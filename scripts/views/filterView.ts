import { mainElement } from '../routing/router';
import { loadTemplate } from './loadTemplate';
import { focusListItem } from '../utils/manageListScroll';
import { routes } from '../routing/routes';

const filters = [
	{ className: 'grassland', textContent: 'Grassland' },
	{ className: 'forest', textContent: 'Forest' },
	{ className: 'waters-edge', textContent: 'Water\'s-edge' },
	{ className: 'sea', textContent: 'Sea' },
	{ className: 'cave', textContent: 'Cave' },
	{ className: 'mountain', textContent: 'Mountain' },
	{ className: 'rough-terrain', textContent: 'Rough-terrain' },
	{ className: 'urban', textContent: 'Urban' },
	{ className: 'rare', textContent: 'Rare' },
];

const sortOrders = [
	{ className: 'numerical', textContent: 'NUMERICAL' },

	{ className: 'alphabetical', textContent: 'A TO Z' },
	{ className: 'type', textContent: 'TYPE' },
	{ className: 'lightest', textContent: 'LIGHTEST' },
	{ className: 'smallest', textContent: 'SMALLEST' }
];

let list: HTMLUListElement;
let sideSprite: HTMLImageElement;
const FilterView = async () => {
	mainElement.innerHTML = '';
	document.title = 'POKéDEX | Filters';

	const template: string = await loadTemplate('pokedexFilter');
	mainElement.innerHTML = template;

	list = mainElement.querySelector('ul') as HTMLUListElement;
	sideSprite = document.createElement('img');
	sideSprite.alt = '';
	list.insertAdjacentElement('afterend', sideSprite);
	list.addEventListener('focusin', changeSprite);

	sessionStorage.removeItem('habitat');
	sessionStorage.removeItem('order');

	generateFilters();
	generateSortOrders();
	generateCloseButton();
	focusListItem(list);
};

// maak filter knoppen dynamisch aan de hand van de filters array
const generateFilters = () => {
	const filterHeader: HTMLLIElement = document.querySelector('.filters-header')!;

	filters.forEach((filter) => {
		const li = document.createElement('li');
		const button = document.createElement('button');
		button.classList.add(filter.className, 'has-icon');
		button.textContent = filter.textContent + ' POKéMON';
		button.setAttribute('aria-label', `filter by ${filter.textContent}`)
		button.addEventListener('click', () => {
			const listViewRoute = routes.find((route) => route.viewName === 'listview');
			window.history.pushState({}, '', `${listViewRoute?.path}?habitat=${filter.className}`)
		});
		li.appendChild(button);
		filterHeader.insertAdjacentElement('afterend', li);
	});
};

// maak sorteer knoppen dynamisch aan de hand van de sortOrders array
const generateSortOrders = () => {
	const pokemonListHeader: HTMLLIElement = document.querySelector('.first-sortorder-header')!;
	const sortOrdersHeader: HTMLLIElement = document.querySelector('.sortorder-header')!;

	sortOrders.forEach((order, i) => {
		const li = document.createElement('li');
		const button = document.createElement('button');
		button.classList.add(order.className, 'has-icon');
		button.textContent = `${order.textContent} MODE`;
		button.setAttribute('aria-label', `sort by ${order.textContent}`)
		button.addEventListener('click', () => {
			const listViewRoute = routes.find((route) => route.viewName === 'listview');
			window.history.pushState({}, '', `${listViewRoute?.path}?order=${order.className}`)
		});
		li.appendChild(button);

		if (i === 0) {
			pokemonListHeader.insertAdjacentElement('afterend', li);
		} else {
			sortOrdersHeader.insertAdjacentElement('afterend', li);
		}
	});
};

// maak close button + logica
const generateCloseButton = () => {
	const li = document.createElement('li');
	const button = document.createElement('button');
	button.textContent = 'CLOSE POKéDEX';
	button.classList.add('close', 'has-icon');
	button.setAttribute('aria-label', 'close pokedex');

	button.addEventListener('click', () => {
		window.history.pushState({}, '', '/')
	});

	li.appendChild(button);
	list.appendChild(li);
};

const head = document.querySelector('head')!;
// preload images terwijl je door de lijst scrolled
const preloadImages = (current: HTMLButtonElement) => {
	// niet preloaden voor mobile omdat img daar niet zichtbaar is
	if(window.matchMedia('(max-width: 600px)').matches) return;

	const items = list.querySelectorAll('.has-icon');
	const index = Array.from(items).indexOf(current);
	const next = items[index + 1] as HTMLButtonElement;

	if (next) {
		const link = head.querySelector(`link[href*="${next.classList[0]}"]`);
		if (!link) {
			head.insertAdjacentHTML('beforeend', `<link rel="preload" type="image/png" href="/img/pokedex-icons/${next.classList[0]}.png" as="image">`);
		}
	}
};

// sprite rechts van de filters veranderen
const changeSprite = (e: FocusEvent) => {
	const activeElement = e.target;
	if (activeElement instanceof HTMLButtonElement) {
		sideSprite.src = `/img/pokedex-icons/${activeElement.classList[0]}.png`;
		preloadImages(activeElement);
	}
};

export { FilterView, filters };
