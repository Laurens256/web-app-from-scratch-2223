export const loadTemplate = async (templateName: string) => {
	const template = templates[templateName];
	return template;
};

const templates = {
	pokemonListItem:
		'<li class="loading skeleton"><button><section><p></p></section><section><h2></h2></section><section><div></div></section></button></li>',
	pokemonDetail:
		'<div class="pokemondetailbg" id="detailview"><div class="wrapper"><button type="button" class="back" aria-label="back">Back</button><article class="pokemondetail loading"><section><section><div><p>&nbsp;</p><h2>&nbsp;</h2></div><p class="species">&nbsp;</p><p class="height">&nbsp;</p><p class="weight">&nbsp;</p></section><section class="imgloading"></section></section><section><p class="flavortext">&nbsp;</p></section></article></div></div>',
	pokedexFilter:
		'<div class="filters" id="filtersview"> <ul> <li class="firstsortorder"><h2>POKéMON LIST</h2></li><li><h2>POKéMON HABITATS</h2></li> <li><button>Grassland POKéMON</button></li> <li><button>Forest POKéMON</button></li> <li><button>Water\'s-edge POKéMON</button></li> <li><button>Sea POKéMON</button></li> <li><button>Cave POKéMON</button></li> <li><button>Mountain POKéMON</button></li> <li><button>Rough-terrain POKéMON</button></li> <li><button>Urban POKéMON</button></li> <li><button>Rare POKéMON</button></li> <li class="sortorders"><h2>SEARCH</h2><li><h2>OTHER</h2></li> <li><button>CLOSE POKéDEX</button></li> </ul> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="master ball"> </div>'
		// pokedexFilter:
		// '<div class="filters"> <ul> <li><h2>POKéMON LIST</h2></li> <li><button>NUMERICAL MODE</button></li> <li><h2>POKéMON HABITATS</h2></li> <li><button>Grassland POKéMON</button></li> <li><button>Forest POKéMON</button></li> <li><button>Water\'s-edge POKéMON</button></li> <li><button>Sea POKéMON</button></li> <li><button>Cave POKéMON</button></li> <li><button>Mountain POKéMON</button></li> <li><button>Rough-terrain POKéMON</button></li> <li><button>Urban POKéMON</button></li> <li><button>Rare POKéMON</button></li> <li class="sortorders"><h2>SEARCH</h2></li> <li><button>A TO Z MODE</button></li> <li><button>TYPE MODE</button></li> <li><button>LIGHTEST MODE</button></li> <li><button>SMALLEST MODE</button></li> <li><h2>OTHER</h2></li> <li><button>CLOSE POKéDEX</button></li> </ul> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="master ball"> </div>'
};
