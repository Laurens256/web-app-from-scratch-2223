const headerElement = document.querySelector('header') as HTMLElement;
const h1Element = headerElement.querySelector('h1') as HTMLElement;
const h2Element = headerElement.querySelector('h2') as HTMLElement;

const headings = {
	ListView: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
		h2: '',
	}, DetailView: {
		h1: 'POKéMON&nbsp;&nbsp;LIST',
		h2: '',
	}
};

const HeaderView = (view: string) => {
	h1Element.innerHTML = headings[view].h1;
	h2Element.innerHTML = headings[view].h2;
};

export { HeaderView };
