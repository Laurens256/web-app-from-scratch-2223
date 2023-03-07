export const loadTemplate = async (templateName: keyof typeof templates) => {
	const template = templates[templateName];
	return template;
};

const templates = {
	pokemonListItem:
		'<li class="loading skeleton"><button><section><p></p></section><section><h2></h2></section><section><div></div></section></button></li>',
	pokemonDetail:
		'<div class="pokemondetailbg" id="detailview"><div class="wrapper"><button type="button" class="back" aria-label="back">Back</button><article class="pokemondetail loading"><section><section><div><p>&nbsp;</p><h2>&nbsp;</h2></div><p class="species">&nbsp;</p><p class="height">&nbsp;</p><p class="weight">&nbsp;</p></section><section class="imgloading"></section></section><section><p class="flavortext">&nbsp;</p></section></article></div></div>',
	pokedexFilter:
		'<div class="filters" id="filtersview"> <ul class="select-list"> <li class="first-sortorder-header"><h2>POKéMON LIST</h2></li><li class="filters-header"><h2>POKéMON HABITATS</h2></li><li class="sortorder-header"><h2>SEARCH</h2><li><h2>OTHER</h2></li></ul> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="master ball"> </div>',
	error: '<div class="error" id="errorview"><h2>404</h2><p>The page you are looking for does not exist</p><div class="buttonsdiv"></div></div>',
};
