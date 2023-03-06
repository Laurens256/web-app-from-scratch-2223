import { mainElement } from '../routing/router';

const ErrorView = () => {
	mainElement.innerHTML = 'sdghjfsjh';

	const backButton = document.createElement('button');
	const backToHomeButton = document.createElement('button');
	backButton.textContent = 'Back';
	backToHomeButton.textContent = 'Back to home';

	backButton.addEventListener('click', () => {
		window.history.back();
	});

	backToHomeButton.addEventListener('click', () => {
		window.history.pushState({}, '', '/');
	});

	mainElement.appendChild(backButton);
	mainElement.appendChild(backToHomeButton);
};

export { ErrorView };