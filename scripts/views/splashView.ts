import { mainElement } from '../routing/router';
import { setEventListeners, eventListenerObj } from '../utils/manageEventListeners';
import { manageWindowResize, handleScreenMove } from '../utils/controls/splashViewControls';

// splash screen view
const SplashView = () => {
	mainElement.innerHTML = '';
	buildSplash();
};

let splashImg: HTMLImageElement;
let splashDiv: HTMLDivElement;
const buildSplash = () => {
	document.title = 'POKéDEX';

	const bgText = document.createElement('h1');
	splashDiv = document.createElement('div');
	splashDiv.classList.add('splashscreen');
	splashDiv.id = 'splashview';
	splashDiv.addEventListener('click', handleScreenMove);

	splashImg = document.createElement('img');

	splashImg.addEventListener('load', manageWindowResize);

	bgText.textContent = 'Press to start';
	splashImg.src = '/img/splash.webp';
	splashImg.alt = 'pokemon fire red splash screen';

	splashDiv.appendChild(bgText);
	splashDiv.appendChild(splashImg);
	mainElement.appendChild(splashDiv);

	const listeners: eventListenerObj[] = [
		{ target: window, event: 'resize', callback: manageWindowResize },
		{ target: document, event: 'keydown', callback: handleScreenMove }
	];
	setEventListeners(listeners);
};

export { SplashView };
