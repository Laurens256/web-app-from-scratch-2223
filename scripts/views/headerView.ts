const headerElement = document.querySelector('header') as HTMLElement;
const h1Element = headerElement.querySelector('h1') as HTMLElement;
const h2Element = headerElement.querySelector('h2') as HTMLElement;

const headings = {
	listview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
		h2: '',
	}, detailview: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
		h2: 'TEST',
	}
};

const HeaderView = (view: string) => {
	view = view.toLowerCase();
	console.log(view);
	console.log(headings[view]);
	h1Element.innerHTML = headings[view].h1;
	h2Element.innerHTML = headings[view].h2;
};

export { HeaderView };
