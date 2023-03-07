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
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
	],
	detailview: [
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL', key: 'b' },
		{ classes: ['control-icon', 'd-pad', 'right', 'left'], text: 'SWITCH POKéMON', key: 'ArrowRight' },
		{ classes: ['control-icon', 'space-bar'], text: 'CRY', key: ' ' },
	],
	filterview: [
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK', key: 'ArrowDown' },
	],
	errorview: [
		{ classes: ['control-icon', 'a-button'], text: 'OK', key: 'a' },
		{ classes: ['control-icon', 'd-pad', 'horizontal'], text: 'PICK', key: 'ArrowRight' },
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
		console.log(e.button);
		if (key === 'ArrowDown' && e.button === 0) {
			key = 'ArrowUp';
		} else if (key === 'ArrowRight' && e.button === 0) {
			key = 'ArrowLeft';
		}


		document.dispatchEvent(new KeyboardEvent('keydown', { 'key': key }));
	});
};

export { FooterView };
