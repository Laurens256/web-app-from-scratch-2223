export type Url = {
	name: string;
	url: string;
};

export interface Pokemon {
	abilities: { ability: Url; is_hidden: boolean; slot: number }[];
	base_experience: number;
	forms: Url[];
	game_indices: {
		game_index: number;
		version: Url;
	}[];
	height: number;
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	name: string;
	order: number;
	past_types: null;
	species: Url;
	sprites: {
		front_default: string;
		front_shiny: string;
	};
	stats: {
		base_stat: number;
		effort: number;
		stat: Url;
	}[];
	types: {
		slot: number;
		type: Url;
	}[];
	weight: number;
}

export interface Species {
	base_happiness: number;
	capture_rate: number;
	color: Url;
	egg_groups: Url[];
	evolution_chain: {
		url: string;
	};
	evolves_from_species: Url;
	flavor_text_entries: {
		flavor_text: string;
		language: Url;
		version: Url;
	}[];
	gender_rate: number;
	generation: Url;
	growth_rate: Url;
	habitat: Url;
	has_gender_differences: boolean;
	hatch_counter: number;
	id: number;
	is_baby: false;
	is_legendary: false;
	is_mythical: false;
	name: string;
	names: {
		language: Url;
		name: string;
	}[];
	order: number;

	varieties: {
		is_default: boolean;
		pokemon: Url;
	}[];
}

// prettier-ignore
export const PokemonTypes = [
	'normal','fire','water','grass','electric','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'
];

//prettier-ignore
export const usedFields = [
	'egg_groups', 'flavor_text_entries', 'habitat', 'id', 'name', 'types', 'sprites', 'weight', 'height'
];
export interface FullPokemonDetails {
	egg_groups: Url[];
	flavor_text_entries: {
		flavor_text: string;
		language: Url;
		version: Url;
	}[];
	habitat: Url;
	id: number;
	name: string;

	types: {
		slot: number;
		type: Url;
	}[];
	sprites: {
		front_default: string;
		front_shiny: string;
	};
	weight: number;
	height: number;
}
