import { mainElement } from '../routing/router';

const DetailView = async (name: string = 'bulbasaur') => {
	mainElement.innerHTML = '';
	mainElement.innerHTML = name;
};

export { DetailView };