import { viewNames } from '../routing/routes';

const h1Element: HTMLHeadingElement = document.querySelector('header h1')!;
const h2Element: HTMLHeadingElement = document.querySelector('header h2')!;


type headerType = {
	[K in viewNames]: { h1: string; h2: string; };
};

const headers: headerType = {
	listview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
		h2: ''
	},
	detailview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
		h2: ''
	},
	filterview: {
		h1: 'POKéDEX',
		h2: 'TABLE OF CONTENTS'
	}
};

const HeaderView = (view: viewNames) => {
	if (h1Element && h2Element && headers[view]) {
		h1Element.innerHTML = headers[view].h1;
		h2Element.innerHTML = headers[view].h2;
	}
};

console.log(HeaderView.name);

export { HeaderView };
