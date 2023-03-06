import { viewNames } from '../routing/routes';

type footerType = {
	[K in viewNames]?: { classes: string[]; text: string; }[];
};

const footerElement = document.querySelector<HTMLElement>('footer');
const footerList: HTMLUListElement = footerElement?.querySelector('ul')!;

const footers: footerType = {
	listview: [
		{ classes: ['control-icon', 'b-button'], text: 'cancel' },
		{ classes: ['control-icon', 'a-button'], text: 'ok' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'pick' },
	],
	detailview: [
		{ classes: ['control-icon', 'b-button'], text: 'cancel' },
		{ classes: ['control-icon', 'a-button'], text: 'next data' },
		{ classes: ['control-icon', 'space-bar'], text: 'cry' }
	],
	filterview: [
		{ classes: ['control-icon', 'a-button'], text: 'ok' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'pick' },
	],
	errorview: [
		{ classes: ['control-icon', 'a-button'], text: 'ok' },
		{ classes: ['control-icon', 'd-pad', 'horizontal'], text: 'pick' },
	]
};

const FooterView = (view: viewNames) => {
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
