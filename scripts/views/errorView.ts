import { mainElement } from '../routing/router';
import { loadTemplate } from './loadTemplate';

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
		window.history.pushState({}, '', '/');
	});

	buttonsDiv.appendChild(backButton);
	buttonsDiv.appendChild(backToHomeButton);
	backButton.focus();
	document.addEventListener('keydown', manageErrorControls);
};



const manageErrorControls = (e: KeyboardEvent) => {
	if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'a') return;
	e.preventDefault();

	const focusedElement = document.activeElement as HTMLElement;
	// focus 1 van de twee buttons
	if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
		focusedElement === backButton ? backToHomeButton.focus() : backButton.focus();
	// klik op de button die nu focused is
	} else if (e.key === 'a' && focusedElement === backButton || focusedElement === backToHomeButton) {
		focusedElement.click();
	}
};

const clearErrorEventListeners = () => {
	document.removeEventListener('keydown', manageErrorControls);
};

export { ErrorView, clearErrorEventListeners };