import { mainElement } from '../routing/router';
import { HeaderView } from './headerView';
import { loadTemplate } from './loadTemplate';
import { focusListItem } from '../utils/manageListScroll';

const sortOrders = [
	{ className: 'numerical', textContent: 'NUMERICAL MODE' },

	{ className: 'alphabetical', textContent: 'A TO Z MODE' },
	{ className: 'type', textContent: 'TYPE MODE' },
	{ className: 'lightest', textContent: 'LIGHTEST MODE' },
	{ className: 'smallest', textContent: 'SMALLEST MODE' }
];

const FilterView = async () => {
	mainElement.innerHTML = '';
	HeaderView('filterview');

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
		button.addEventListener('click', chooseSortOrder);
		li.appendChild(button);

		if (i === 0) {
			pokemonListHeader.insertAdjacentElement('afterend', li);
		} else {
			sortOrdersHeader.insertAdjacentElement('afterend', li);
		}
	});
};

const chooseSortOrder = (e: Event) => {
	if (!(e.currentTarget instanceof HTMLButtonElement)) return;
	window.history.pushState({}, '', `/?order=${e.currentTarget.className}`);
};

export { FilterView };
