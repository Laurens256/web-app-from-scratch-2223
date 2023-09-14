// levert templates aan voor alle views
export const loadTemplate = async (templateName: keyof typeof templates) => {
	const template = templates[templateName];
	return template;
};

const templates = {
	pokemonListItem:
		'<li class="loading skeleton"><a href=""><section><p></p></section><section><h2></h2></section><section><div></div></section></a></li>',
	pokemonDetail:
		'<div class="pokemondetailbg" id="detailview"><div class="wrapper"><a class="back">Back</a><article class="pokemondetail loading"><section><section><div><p>&nbsp;</p><h2>&nbsp;</h2></div><p class="species">&nbsp;</p><p class="height">&nbsp;</p><p class="weight">&nbsp;</p></section><section class="imgloading"></section></section><section><p class="flavortext">&nbsp;</p></section></article></div></div>',
	pokedexFilter:
		'<div class="filters" id="filtersview"> <ul class="select-list"> <li class="first-sortorder-header"><h2>POKéMON LIST</h2></li><li class="filters-header"><h2>POKéMON HABITATS</h2></li><li class="sortorder-header"><h2>SEARCH</h2><li><h2>OTHER</h2></li></ul></div>',
	error: '<div class="error" id="errorview"><h2>404</h2><p>The page you are looking for does not exist</p><div class="buttonsdiv"><a href="javascript: history.go(-1)">Back<a href="/">Back to home</div></div>',
};
