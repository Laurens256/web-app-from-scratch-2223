import { viewNames } from '../routing/routes';

type footerType = {
	[K in viewNames]: { classes: string[]; text: string; }[];
};

const footerList: HTMLUListElement = document.querySelector('footer ul')!;

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
};

const FooterView = (view: viewNames) => {
	if (footerList && footers[view]) {
		footerList.innerHTML = '';
		footers[view].forEach((control) => {
			const li = document.createElement('li');

			li.classList.add(...control.classes);
			li.textContent = control.text;
			footerList.insertAdjacentElement('afterbegin', li);
		});
	}
};

export { FooterView };
