export const loadTemplate = async (templateName: string) => {
	const template = templates[templateName];
	return template;
};

const templates = {
	pokemonListItem:
		'<li class="loading skeleton"><button><section><p></p></section><section><h2></h2></section><section><div></div></section></button></li>',
};
