import { moveArrow } from '../manageListScroll';

const genericListKeyDown = (e: KeyboardEvent) => {
	if (e.key === 'ArrowUp') {
		e.preventDefault();
		moveArrow(-1);
	} else if (e.key === 'ArrowDown') {
		e.preventDefault();
		moveArrow(1);
	} else if (e.key === 'a') {
		const activeElement = document.activeElement;
		if (activeElement instanceof HTMLElement) {
			activeElement.click();
		}
	}
};

export { genericListKeyDown };