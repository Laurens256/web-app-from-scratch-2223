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

const FilterView = async () => {
	mainElement.innerHTML = '';

	const template: string = await loadTemplate('pokedexFilter');
	mainElement.innerHTML = template;

	const list = mainElement.querySelector('ul') as HTMLUListElement;

	generateFilters();
	generateSortOrders();
	focusListItem(list);
};

const generateFilters = () => {
	const filterHeader: HTMLLIElement = document.querySelector('.filters-header')!;
	
	filters.forEach((filter) => {
		const li = document.createElement('li');
		const button = document.createElement('button');
		button.classList.add(filter.className);
		button.textContent = filter.textContent + ' POKéMON';
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
		button.classList.add(order.className);
		button.textContent = `${order.textContent} MODE`;
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

export { FilterView, filters };
