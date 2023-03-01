import { mainElement } from '../routing/router';
import { HeaderView } from './headerView';
import { loadTemplate } from './loadTemplate';

const FilterView = async () => {
	mainElement.innerHTML = '';
	HeaderView('filterview');
};

const generateFilters = async () => {
	const template = await loadTemplate('pokedexFilter');

	mainElement.innerHTML = template;
};

export { FilterView };