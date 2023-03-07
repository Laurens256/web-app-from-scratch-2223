import { viewNames } from '../routing/routes';

type footerType = {
	[K in viewNames]?: { classes: string[]; text: string; key: string }[];
};

const footerElement = document.querySelector<HTMLElement>('footer');
const footerList: HTMLUListElement = footerElement?.querySelector('ul')!;

const footers: footerType = {
	listview: [
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' },
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowUp' },
	],
	detailview: [
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' },
		{ classes: ['control-icon', 'd-pad', 'right', 'left'], text: 'SWITCH POKéMON', key: 'ArrowLeft' },
		{ classes: ['control-icon', 'space-bar'], text: 'CRY', key: ' ' },
	],
	filterview: [
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowUp' },
	],
	errorview: [
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'horizontal'], text: 'PICK', key: 'ArrowLeft' },
	]
};

const FooterView = (view: viewNames) => {
	if (!footerElement) return;
	footerList.innerHTML = '';
	if (!footers[view]) {
		footerElement?.classList.add('hidden');
	} else {
		footerElement?.classList.remove('hidden');
		footers[view]!.forEach((control) => {
			const li = document.createElement('li');

			setControlListeners(li, control);

			li.classList.add(...control.classes);
			li.textContent = control.text;
			footerList.insertAdjacentElement('afterbegin', li);
		});

	}
};

const setControlListeners = (li: HTMLLIElement, control: { key: string; }) => {
	li.addEventListener('contextmenu', e => e.preventDefault());
	li.addEventListener('mousedown', (e) => {
		e.preventDefault();

		let key = control.key;
		if (control.key === 'ArrowUp' && e.button === 2) {
			key = 'ArrowDown';
		} else if (control.key === 'ArrowLeft' && e.button === 2) {
			key = 'ArrowRight';
		}


		document.dispatchEvent(new KeyboardEvent('keydown', { 'key': key }));
	});
};

export { FooterView };
