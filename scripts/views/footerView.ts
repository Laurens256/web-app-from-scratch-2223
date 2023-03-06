const footerList: HTMLUListElement = document.querySelector('footer ul')!;

type footersType = keyof typeof footers;

const footers = {
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

const FooterView = (view: footersType) => {
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

export { FooterView, footersType };
