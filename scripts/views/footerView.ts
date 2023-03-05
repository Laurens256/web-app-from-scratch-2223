import { routeNames } from '../routing/routes';

const footerList: HTMLUListElement = document.querySelector('footer ul')!;

type footerType = {
	[key in keyof typeof routeNames]: { classes: string[]; text: string }[];
};

const footers: footerType = {
	listview: [
		{ classes: ['control-icon', 'a-button'], text: 'OK' },
		{ classes: ['control-icon', 'b-button'], text: 'PICK' },
		{ classes: ['control-icon', 'd-pad', 'vertical'], text: 'PICK' },
		{ classes: ['control-icon', 'space-bar'], text: 'PICK' }
	],
	detailview: [
		{ classes: ['control-icon', 'b-button'], text: 'cancel' },
		{ classes: ['control-icon', 'a-button'], text: 'next data' },
		{ classes: ['control-icon', 'space-bar'], text: 'cry' }
	],
	filterview: []
};

const FooterView = (view: keyof typeof routeNames) => {
	if (footerList) {
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
