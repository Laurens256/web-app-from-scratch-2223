export const loadTemplate = async (templateName: string) => {
	const template = templates[templateName];
	return template;
};

const templates = {
	pokemonListItem:
		'<li class="loading skeleton"><button><section><p></p></section><section><h2></h2></section><section><div></div></section></button></li>',
	pokemonDetail: 
	'<div class="pokemondetailbg" id="detailview"><div class="wrapper"><button type="button" class="back" aria-label="back">Back</button><article class="pokemondetail loading"><section><section><div><p>&nbsp;</p><h2>&nbsp;</h2></div><p class="species">&nbsp;</p><p class="height">&nbsp;</p><p class="weight">&nbsp;</p></section><section class="imgloading"></section></section><section><p class="flavortext">&nbsp;</p></section></article></div></div>',
	pokedexFilter: ''
};
