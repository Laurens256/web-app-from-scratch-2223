import { pokemonListItem } from '../../templates/pokemonListItem';

// const loadTemplate = async (templateName: string) => {
// 	const template = await (await fetch(`/templates/${templateName}.tmpl`)).text();
// 	return template;
// };

const loadTemplate = async (templateName: string) => {
	// heel crappy maar fix later wel als ik zin heb
	const template = templateName === 'pokemon-list-item' ? pokemonListItem : '';
	return template;
};

export { loadTemplate };
