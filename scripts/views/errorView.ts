import { mainElement } from '../routing/router';
import { loadTemplate } from './loadTemplate';
import { setEventListeners, eventListenerObj } from '../utils/manageEventListeners';
import { errorViewKeyDown } from '../utils/controls/errorViewControls';


const ErrorView = async () => {
	mainElement.innerHTML = '';
	document.title = 'POKéDEX | 404';

	const template = await loadTemplate('error');
	mainElement.innerHTML = template;


	const backAnchor: HTMLElement | null = document.querySelector('div.buttonsdiv a:first-of-type');
	backAnchor?.focus();

	const listeners: eventListenerObj[] = [{ target: document, event: 'keydown', callback: errorViewKeyDown }];
	setEventListeners(listeners);
};

export { ErrorView };