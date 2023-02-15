const typeColors = {
	normal: '#A8A878',
	fire: '#F08030',
	water: '#6890F0',
	electric: '#F8D030',
	grass: '#78C850',
	ice: '#98D8D8',
	fighting: '#C03028',
	poison: ['#f85888', '#a040a0'],
	ground: '#E0C068',
	flying: '#A890F0',
	psychic: '#F85888',
	bug: '#A8B820',
	rock: '#B8A038',
	ghost: '#705898',
	dragon: '#7038F8',
	dark: '#705848',
	steel: '#B8B8D0',
	fairy: '#EE99AC'
};

const typeBadges = {};

const multiplier = 4;
const width = 32 * multiplier;
const height = 12 * multiplier;

for (const type in typeColors) {
	const canvas = document.createElement('canvas') as HTMLCanvasElement;
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d')!;

	if (typeof typeColors[type] === 'string') {
		ctx.fillStyle = typeColors[type];
		ctx.fillRect(0, 0, width, height);
	} else {
		ctx.fillStyle = typeColors[type][0];
		ctx.fillRect(0, 0, width, height / 2);
		ctx.fillStyle = typeColors[type][1];
		ctx.fillRect(0, height / 2, width, height / 2);
	}
	ctx.clearRect(0, 0, multiplier, multiplier);
	ctx.clearRect(width - multiplier, 0, multiplier, multiplier);
	ctx.clearRect(0, height - multiplier, multiplier, multiplier);
	ctx.clearRect(width - multiplier, height - multiplier, multiplier, multiplier);

	typeBadges[type] = canvas;
}

// basically geen performance verschil in canvas drawen of clonen en drawen maar dit is overzichtelijker imo
const getTypeBadge = (type: string) => {
	const originalCanvas = typeBadges[type];
	if (originalCanvas) {
		const newCanvas = originalCanvas.cloneNode(true) as HTMLCanvasElement;
		const ctx = newCanvas.getContext('2d')!;
		ctx.drawImage(originalCanvas, 0, 0);
		return newCanvas;
	}
	return document.createElement('');
};

export { getTypeBadge };
