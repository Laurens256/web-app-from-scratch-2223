export const defaultUserData = {
	member: {
		avatar: 'https://avatars.githubusercontent.com/u/85798751?v=4',
		bio: { html: 'Unbothered. Moisturized. Happy. In My Lane. Focused. Flourishing.' },
		gitHubHandle: 'Laurens256',
		id: 'cldep8zqq3wbh0av00ktcml8w',
		name: 'Laurens',
		nickname: 'Laurens256',
		prefix: 'dr',
		role: ['student'],
		slug: 'garfield-enjoyer',
		squads: [
			{ cohort: '2023', name: 'Minor Web', slug: 'minor-web-2023', website: null }
		],
		surname: 'Duin',
		website: ''
	}
};

//prettier-ignore
const quotes = ['Give 110 percent', 'Think outside the box', 'Heavy lifting', "Don't count your chickens before they've hatched", 'Let the cat out of the bag', 'Blue-sky thinking', "There's no I in team", 'Back to the drawing board', 'Paradigm shift', 'Raise the bar', 'Drill down', 'Best thing since sliced bread', 'Skin in the game', 'Play hardball', "Don't reinvent the wheel", 'Kept in the loop', 'Team player', 'Stay golden ponyboy', 'Go big or go home', 'Take a chill pill', 'Got your goat', 'Go bananas', 'Beef up'];

export const defaultQuote = quotes[Math.floor(Math.random() * quotes.length)];
