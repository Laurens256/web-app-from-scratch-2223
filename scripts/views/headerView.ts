import { routeNames } from '../routing/routes';

const h1Element: HTMLHeadingElement = document.querySelector('header h1')!;
const h2Element: HTMLHeadingElement = document.querySelector('header h2')!;

type headerType = {
	[key in keyof typeof routeNames]: { h1: string; h2: string };
};

const headings: headerType = {
	listview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
		h2: ''
	},
	detailview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
		h2: 'TEST'
	},
	filterview: {
		h1: 'POKéDEX',
		h2: 'TABLE OF CONTENTS'
	}
};

const HeaderView = (view: keyof typeof routeNames) => {
	if (h1Element && h2Element) {
		h1Element.innerHTML = headings[view].h1;
		h2Element.innerHTML = headings[view].h2;
	}
};

export { HeaderView };
