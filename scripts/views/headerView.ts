import { viewNames } from '../routing/routes';

const headerElement = document.querySelector<HTMLElement>('header');
const h1Element = headerElement?.querySelector<HTMLHeadingElement>('h1');
const h2Element = headerElement?.querySelector<HTMLHeadingElement>('h2');


type headerType = {
	[K in viewNames]?: { h1: string; h2: string; };
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
	},
	errorview: {
		h1: '404',
		h2: 'PAGE NOT FOUND'
	}
};

const HeaderView = (view: viewNames) => {
	if(!headerElement) return;
	if (!headers[view]) {
		headerElement?.classList.add('hidden');
	} else if (h1Element && h2Element) {
		headerElement?.classList.remove('hidden');
		h1Element.innerHTML = headers[view]!.h1;
		h2Element.innerHTML = headers[view]!.h2;
	}
};

export { HeaderView };
