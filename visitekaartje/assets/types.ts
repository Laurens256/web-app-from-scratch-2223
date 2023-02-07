export interface User {
	member: {
		avatar: string;
		bio: { html: string };
		gitHubHandle: string;
		id: string;
		name: string;
		nickname: string;
		prefix: string;
		role: string[];
		slug: string;
		squads: Squad[];
		surname: string;
		website: string;
	};
}

export interface Squad {
	cohort: string;
	name: string;
	slug: string;
	website: string | null;
}
