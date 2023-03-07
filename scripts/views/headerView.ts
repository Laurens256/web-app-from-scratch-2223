import { viewNames } from '../routing/routes';

const headerElement = document.querySelector<HTMLElement>('header');
const headerUl = headerElement?.querySelector<HTMLUListElement>('header ul');

type headerType = {
	[K in viewNames]?: { h1: string; h2?: string };
};


const headers: headerType = {
	listview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
	},
	detailview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
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

// const HeaderView = (view: viewNames) => {
// 	if (!headerElement || !headerH1Li || !headerH2Li) return;
// 	headerH1Li.innerHTML = '';
// 	headerH2Li.innerHTML = '';
// 	if (!headers[view]) {
// 		headerElement?.classList.add('hidden');
// 	} else {
// 		headerElement?.classList.remove('hidden');

// 		const h1Element = document.createElement('h1');
// 		h1Element.innerHTML = headers[view]!.h1;
// 		headerH1Li!.appendChild(h1Element);

// 		if (headers[view]!.h2 !== '') {
// 			console.log(headers[view]!.h2);
// 			const h2Element = document.createElement('h2');
// 			h2Element.innerHTML = headers[view]!.h2;
// 			headerH2Li!.appendChild(h2Element);
// 		}
// 	}
// };

const HeaderView = (view: viewNames) => {
	if (!headerElement || !headerUl) return;
	headerUl.innerHTML = '';
	if (!headers[view]) {
		headerElement?.classList.add('hidden');
	} else {
		headerElement?.classList.remove('hidden');

		for (const key in headers[view]) {
			const li = document.createElement('li');
			const element = document.createElement(key);
			const value: string = headers[view]![key as keyof typeof headers[typeof view]];
			element.innerHTML = value;
			li.appendChild(element);
			headerUl.appendChild(li);
		}
	}
};

export { HeaderView };
