export const loadTemplate = async (templateName: string) => {
	const template = templates[templateName];
	return template;
};

const templates = {
	pokemonListItem:
		'<li class="loading skeleton"><button><section><p></p></section><section><h2></h2></section><section><div></div></section></button></li>',
	pokemonDetail: 
	'<article class="pokemondetail"><section><section><div><p></p><h2></h2></div><p class="species"></p><p class="height"></p><p class="weight"></p></section><img src="" alt=""></section></article>'
};
