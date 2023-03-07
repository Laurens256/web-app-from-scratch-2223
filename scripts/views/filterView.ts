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
	list.insertAdjacentElement('afterend', sideSprite);
	list.addEventListener('focusin', changeSprite);

	generateFilters();
	generateSortOrders();
	generateCloseButton();
	focusListItem(list);
	preloadImages();
};

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

// preload images zodat ze niet pas geladen worden als je erop klikt, blokkeert als het goed is niet de ui
let preloaded = false;
const preloadImages = () => {
	if (preloaded) return;
	preloaded = true;
	const items = list.querySelectorAll('.has-icon');
	const head = document.querySelector('head')!;
	items.forEach((item) => {
		head.insertAdjacentHTML('beforeend', `<link rel="preload" href="/img/pokedex-icons/${item.classList[0]}.png" as="image">`);
	});
};

const changeSprite = (e: FocusEvent) => {
	const activeElement = e.target;
	if (activeElement instanceof HTMLButtonElement) {
		sideSprite.src = `/img/pokedex-icons/${activeElement.classList[0]}.png`;
	}
};

export { FilterView, filters };
