const h1Element: HTMLHeadingElement = document.querySelector('header h1')!;
const h2Element: HTMLHeadingElement = document.querySelector('header h2')!;

type headersType = keyof typeof headers;

const headers = {
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

const HeaderView = (view: headersType) => {
	if (h1Element && h2Element && headers[view]) {
		h1Element.innerHTML = headers[view].h1;
		h2Element.innerHTML = headers[view].h2;
	}
};

export { HeaderView, headersType };
