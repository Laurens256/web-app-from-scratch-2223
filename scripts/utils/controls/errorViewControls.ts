import { playBeepSound } from '../soundEffects';

const errorViewKeyDown = (e: KeyboardEvent) => {
	if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'a') return;
	e.preventDefault();

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
};

export { errorViewKeyDown };