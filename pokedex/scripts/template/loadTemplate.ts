import { pokemonListItem } from '../../templates/pokemonListItem';
import templates from '../../templates/test.json';

// const loadTemplate = async (templateName: string) => {
// 	const template = await (await fetch(`/templates/${templateName}.tmpl`)).text();
// 	return template;
// };

// const templates = {

// };

const loadTemplate = async (templateName: string) => {
	const template = templates[templateName];
	// heel crappy maar fix later wel als ik zin heb
	// const template = templateName === 'pokemon-list-item' ? pokemonListItem : '';
	return template;
};

export { loadTemplate };
