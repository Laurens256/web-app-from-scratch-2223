import { viewNames } from '../routing/routes';

type footerType = {
	[K in viewNames]?: { classes: string[]; text: string; }[];
};

const footerElement = document.querySelector<HTMLElement>('footer');
const footerList: HTMLUListElement = footerElement?.querySelector('ul')!;

const footers: footerType = {
	listview: [
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL' },
		{ classes: ['control-icon', 'a-button'], text: 'OK' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK' },
	],
	detailview: [
		{ classes: ['control-icon', 'b-button'], text: 'CANCEL' },
		{ classes: ['control-icon', 'a-button'], text: 'NEXT POKéMON' },
		{ classes: ['control-icon', 'space-bar'], text: 'CRY' }
	],
	filterview: [
		{ classes: ['control-icon', 'a-button'], text: 'OK' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK' },
	],
	errorview: [
		{ classes: ['control-icon', 'a-button'], text: 'OK' },
		{ classes: ['control-icon', 'd-pad', 'horizontal'], text: 'PICK' },
	]
};

const FooterView = (view: viewNames) => {
	if(!footerElement) return;
	footerList.innerHTML = '';
	if (!footers[view]) {
		footerElement?.classList.add('hidden');
	} else {
		footerElement?.classList.remove('hidden');
		footers[view]!.forEach((control) => {
			const li = document.createElement('li');

			li.classList.add(...control.classes);
			li.textContent = control.text;
			footerList.insertAdjacentElement('afterbegin', li);
		});

	}
};

export { FooterView };
