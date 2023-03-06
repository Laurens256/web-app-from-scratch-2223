import { mainElement } from '../routing/router';
import { loadTemplate } from './loadTemplate';
import { focusListItem } from '../utils/manageListScroll';
import { routes } from '../routing/routes';

const sortOrders = [
	{ className: 'numerical', textContent: 'NUMERICAL MODE' },

	{ className: 'alphabetical', textContent: 'A TO Z MODE' },
	{ className: 'type', textContent: 'TYPE MODE' },
	{ className: 'lightest', textContent: 'LIGHTEST MODE' },
	{ className: 'smallest', textContent: 'SMALLEST MODE' }
];

const FilterView = async () => {
	mainElement.innerHTML = '';

	const template: string = await loadTemplate('pokedexFilter');
	mainElement.innerHTML = template;

	const list = mainElement.querySelector('ul') as HTMLUListElement;

	generateSortOrders();
	focusListItem(list);
};

const generateSortOrders = async () => {
	const pokemonListHeader: HTMLLIElement = document.querySelector('.firstsortorder')!;
	const sortOrdersHeader: HTMLLIElement = document.querySelector('.sortorders')!;	

	sortOrders.forEach((order, i) => {
		const li = document.createElement('li');
		const button = document.createElement('button');
		button.classList.add(order.className);
		button.textContent = order.textContent;
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

export { FilterView };
