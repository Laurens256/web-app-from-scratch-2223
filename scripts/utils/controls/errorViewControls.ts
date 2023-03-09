import { playBeepSound } from '../soundEffects';
import { delay } from '../generalHelpers';

let isRunning = false;
const errorViewKeyDown = async (e: KeyboardEvent) => {
	if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'a' || (isRunning && e.key !== 'a')) return;
	e.preventDefault();
	isRunning = true;

	const backButton: HTMLButtonElement | null = document.querySelector('div.buttonsdiv button:first-of-type');
	const backToHomeButton: HTMLButtonElement | null = document.querySelector('div.buttonsdiv button:last-of-type');

	const focusedElement = document.activeElement as HTMLElement;
	// focus 1 van de twee buttons
	if (backButton && backToHomeButton && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
		focusedElement === backButton ? backToHomeButton.focus() : backButton.focus();
		playBeepSound();

		// klik op de button die nu focused is
	} else if (e.key === 'a' && focusedElement === backButton || focusedElement === backToHomeButton) {
		focusedElement.click();
	}

	await delay(90);
	isRunning = false;
};

export { errorViewKeyDown };