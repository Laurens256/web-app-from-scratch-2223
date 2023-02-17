import { PokemonTypes } from '../assets/types';

// const typeColors = {
// 	normal: '#a8a878',
// 	fire: '#f08030',
// 	water: '#6890f0',
// 	grass: '#78c850',
// 	electric: '#f8b010',
// 	ice: '#98d8d8',
// 	fight: '#e83000',
// 	poison: ['#f85888', '#a040a0'],
// 	ground: ['#d8e030', '#b8a038'],
// 	flying: ['#98d8d8', '#a8a878'],
// 	psychic: '#f85888',
// 	bug: '#d8e030',
// 	rock: '#b8a038',
// 	ghost: '#a040a0',
// 	dragon: ['#6890f0', '#e83000'],
// 	dark: '#507888',
// 	steel: ['#a8a878', '#507888'],
// 	fairy: '#d692d4',
// 	unknown: ['#9cdede', '#ff5a8c']
// };

// const multiplier = 4;
// const width = 32 * multiplier;
// const height = 12 * multiplier;

// for (const type in typeColors) {
// 	const canvas = document.createElement('canvas') as HTMLCanvasElement;
// 	canvas.width = width;
// 	canvas.height = height;
// 	const ctx = canvas.getContext('2d')!;

// 	if (typeof typeColors[type] === 'string') {
// 		ctx.fillStyle = typeColors[type];
// 		ctx.fillRect(0, 0, width, height);
// 	} else {
// 		ctx.fillStyle = typeColors[type][0];
// 		ctx.fillRect(0, 0, width, height / 2);
// 		ctx.fillStyle = typeColors[type][1];
// 		ctx.fillRect(0, height / 2, width, height / 2);
// 	}
// 	ctx.clearRect(0, 0, multiplier, multiplier);
// 	ctx.clearRect(width - multiplier, 0, multiplier, multiplier);
// 	ctx.clearRect(0, height - multiplier, multiplier, multiplier);
// 	ctx.clearRect(width - multiplier, height - multiplier, multiplier, multiplier);

// 	typeBadges[type] = canvas;
// }

// Blijkbaar is het ~11x sneller om een canvas nieuw te maken dan om een bestaand canvas te klonen
// const getTypeBadge = (type: string) => {
// 	const canvas = document.createElement('canvas') as HTMLCanvasElement;
// 	canvas.width = width;
// 	canvas.height = height;
// 	const ctx = canvas.getContext('2d')!;

// 	if (!typeColors[type]) {
// 		type = 'unknown';
// 	}

// 	// teken de badge een kleur of twee kleuren
// 	if (typeof typeColors[type] === 'string') {
// 		ctx.fillStyle = typeColors[type];
// 		ctx.fillRect(0, 0, width, height);
// 	} else if (typeof typeColors[type] === 'object') {
// 		ctx.fillStyle = typeColors[type][0];
// 		ctx.fillRect(0, 0, width, height / 2);
// 		ctx.fillStyle = typeColors[type][1];
// 		ctx.fillRect(0, height / 2, width, height / 2);
// 	}
// 	// haalt de hoekjes weg
// 	ctx.clearRect(0, 0, multiplier, multiplier);
// 	ctx.clearRect(width - multiplier, 0, multiplier, multiplier);
// 	ctx.clearRect(0, height - multiplier, multiplier, multiplier);
// 	ctx.clearRect(width - multiplier, height - multiplier, multiplier, multiplier);

// 	return canvas;
// };

const getTypeBadge = (type: string) => {
	const typeDiv = document.createElement('div');
	typeDiv.classList.add('typebadge');
	typeDiv.classList.add(type);

	let badgeName = '';
	if (type === 'fighting') {
		badgeName = 'fight';
	} else if (type === 'psychic') {
		badgeName = 'psychc';
	} else if (type === 'electric') {
		badgeName = 'electr';
	} else if (!PokemonTypes.includes(type)) {
		badgeName = '???';
	} else {
		badgeName = type;
	}
	typeDiv.setAttribute('data-type-visual', badgeName);

	return typeDiv;
};

export { getTypeBadge };
