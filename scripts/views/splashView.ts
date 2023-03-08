import { mainElement } from '../routing/router';
import { routes } from '../routing/routes';
import { playBgMusic } from '../utils/soundEffects';

const SplashView = () => {
	mainElement.innerHTML = '';
	buildSplash();
};

let splashImg: HTMLImageElement;
let splashDiv: HTMLDivElement;
const buildSplash = () => {
	document.title = 'POKéDEX';

	splashDiv = document.createElement('div');
	splashDiv.classList.add('splashscreen');
	splashDiv.id = 'splashview';
	splashDiv.addEventListener('click', moveScreen);

	splashImg = document.createElement('img');

	splashImg.addEventListener('load', manageSplashBg);

	splashImg.src = '/img/splash.webp';
	splashImg.alt = 'pokemon fire red splash screen';

	splashDiv.appendChild(splashImg);
	mainElement.appendChild(splashDiv);

	playBgMusic(false, false, 'title-screen');
	window.addEventListener('resize', manageSplashBg);
	document.addEventListener('keydown', moveScreen);
};

const manageSplashBg = () => {
	if (splashImg.clientWidth >= window.innerWidth) {
		splashDiv.classList.add('fullwidth');
	} else {
		splashDiv.classList.remove('fullwidth');
	}
};

const clearSplashEventListeners = () => {
	window.removeEventListener('resize', manageSplashBg);
	document.removeEventListener('keydown', moveScreen);
};

const moveScreen = (e: MouseEvent | KeyboardEvent) => {
	if (e instanceof KeyboardEvent) {
		if (!(e.key == 'Enter' || e.key == ' ' || e.key == 'a' || 'Escape')) {
			return;
		}

		if(e.key === 'Escape') {
			playBgMusic(false, true, 'driftveil');
		}
	}
	const filterRoute = routes.find(route => route.viewName === 'filterview');
	window.history.pushState({}, '', filterRoute?.path || '/filters');
};

export { SplashView, clearSplashEventListeners };