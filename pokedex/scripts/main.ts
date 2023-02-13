const rootElement = document.documentElement;

const baseApiUrl = 'https://pokeapi.co/api/v2/';

const fetchPokemonByGen = async (gen: number) => {
	return (await (await fetch(`${baseApiUrl}generation/${gen}`)).json()).pokemon_species;
};

const displayPokemonList = async (gen: number) => {
	const data = await fetchPokemonData(gen);

	// We now have all the individual Pokemon from a single color in an array, let's do 
	// something with it!
 	
	// For every entry in the array, where d is the individual item and i is the index.
	data.forEach((d, i) => {
		console.log(d);
		
		// Grab the table we've created in the HTML already
		const table = document.querySelector('table tbody');
		
		// Generate a new row for above table
		const row = document.createElement('tr');
		const tdName = document.createElement('td');
		
		// Add a property of the Pokemon Object as text
		tdName.textContent = d.name;
		
		// Append the <td> to the previously created row.
		row.appendChild(tdName);
		
		const tdId = document.createElement('td');
		tdId.textContent = d.id;
		row.appendChild(tdId);
		
		const tdGeneration = document.createElement('td');
		tdGeneration.textContent = d.generation.name.split('-')[1];
		row.appendChild(tdGeneration);
	});
};


async function getDataFromAPI(id: string) {
	const data = await (await fetch(baseApiUrl)).json();
	return data;
}

const fetchPokemonData = async (gen: number) => {
	const pokemonArr = await fetchPokemonByGen(gen);
	
	const promises = pokemonArr.map(async pokemon => {
		return await getDataFromAPI(pokemon.url);
	});

	return Promise.all(promises);
}


displayPokemonList(1);