import { mainElement } from '../routing/router';
import { playBeepSound } from '../utils/soundEffects';
import { loadTemplate } from './loadTemplate';
import { setEventListeners, eventListenerObj } from '../utils/manageEventListeners';
import { errorViewKeyDown } from '../utils/controls/errorViewControls';

let backButton: HTMLButtonElement;
let backToHomeButton: HTMLButtonElement;

const ErrorView = async () => {
	mainElement.innerHTML = '';
	document.title = 'POKéDEX | 404';

	const template = await loadTemplate('error');
	mainElement.innerHTML = template;

	const buttonsDiv = mainElement.querySelector('.buttonsdiv') as HTMLDivElement;

	backButton = document.createElement('button');
	backToHomeButton = document.createElement('button');
	backButton.textContent = 'Back';
	backToHomeButton.textContent = 'Back to home';

	backButton.addEventListener('click', () => {
		window.history.back();
	});

	backToHomeButton.addEventListener('click', () => {
		window.history.replaceState({}, '', '/');
	});

	buttonsDiv.appendChild(backButton);
	buttonsDiv.appendChild(backToHomeButton);
	backButton.focus();

	const listeners: eventListenerObj[] = [{ target: document, event: 'keydown', callback: errorViewKeyDown }];
	setEventListeners(listeners);
};

export { ErrorView };