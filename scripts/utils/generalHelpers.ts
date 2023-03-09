const hectogramToPound = (hectogram: number) => {
	return (hectogram / 4.536).toFixed(1).toString();
};

const decimeterToFoot = (decimeter: number) => {
	const feetInches = (decimeter / 3.048).toFixed(2).split('.');
	return `${feetInches[0]}‘${feetInches[1]}`;
};

const delay = (n: number) => {
	return new Promise((resolve) => setTimeout(resolve, n));
};

export { hectogramToPound, decimeterToFoot, delay };
