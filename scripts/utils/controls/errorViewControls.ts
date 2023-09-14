import { playBeepSound } from '../soundEffects';
import { delay } from '../generalHelpers';

let isRunning = false;
const errorViewKeyDown = async (e: KeyboardEvent) => {
	if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'a' || (isRunning && e.key !== 'a')) return;
	e.preventDefault();
	isRunning = true;

	const backAnchor: HTMLAnchorElement | null = document.querySelector('div.buttonsdiv a:first-of-type');
	const backToHomeAnchor: HTMLAnchorElement | null = document.querySelector('div.buttonsdiv a:last-of-type');

	const focusedElement = document.activeElement as HTMLElement;
	// focus 1 van de twee buttons
	if (backAnchor && backToHomeAnchor && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
		focusedElement === backAnchor ? backToHomeAnchor.focus() : backAnchor.focus();
		playBeepSound();

		// klik op de anchor die nu focused is
	} else if (e.key === 'a' && focusedElement === backAnchor || focusedElement === backToHomeAnchor) {
		focusedElement.click();
	}

	await delay(90);
	isRunning = false;
};

export { errorViewKeyDown };