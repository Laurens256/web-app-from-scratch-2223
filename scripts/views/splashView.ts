import { mainElement } from '../routing/router';
import { setEventListeners, eventListenerObj } from '../utils/manageEventListeners';
import { manageWindowResize, handleScreenMove } from '../utils/controls/splashViewControls';

// splash screen view
const SplashView = () => {
	mainElement.innerHTML = '';
	buildSplash();
};

let splashImg: HTMLImageElement;
let splashAnchor: HTMLAnchorElement;
const buildSplash = () => {
	document.title = 'POKéDEX';

	const bgText = document.createElement('h1');

	splashAnchor = document.createElement('a');
	splashAnchor.href = '/filters';
	splashAnchor.setAttribute('aria-label', 'Press to start');
	splashAnchor.classList.add('splashscreen');
	splashAnchor.addEventListener('click', handleScreenMove);

	splashImg = document.createElement('img');

	splashImg.addEventListener('load', manageWindowResize);

	bgText.textContent = 'Press to start';
	splashImg.src = '/img/splash.webp';
	splashImg.alt = 'pokemon fire red splash screen';

	splashAnchor.appendChild(bgText);
	splashAnchor.appendChild(splashImg);

	mainElement.appendChild(splashAnchor);

	const listeners: eventListenerObj[] = [
		{ target: window, event: 'resize', callback: manageWindowResize },
		{ target: document, event: 'keydown', callback: handleScreenMove }
	];
	setEventListeners(listeners);
};

export { SplashView };
