import { mainElement } from '../routing/router';
import { routes } from '../routing/routes';

const SplashView = () => {
	mainElement.innerHTML = '';
	buildSplash();
};

let splashImg: HTMLImageElement;
let splashDiv: HTMLDivElement;
const buildSplash = () => {
	splashDiv = document.createElement('div');
	splashDiv.classList.add('splashscreen');
	splashDiv.id = 'splashview';
	splashDiv.addEventListener('click', moveScreen);

	splashImg = document.createElement('img');

	splashImg.addEventListener('load', manageSplashBg);

	splashImg.src = 'assets/img/splash.webp';
	splashImg.alt = 'pokemon fire red splash screen';

	splashDiv.appendChild(splashImg);
	mainElement.appendChild(splashDiv);

	window.addEventListener('resize', manageSplashBg);
	window.addEventListener('keydown', moveScreen);
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
	window.removeEventListener('keydown', moveScreen);
};

const moveScreen = (e: MouseEvent | KeyboardEvent) => {
	if (e instanceof KeyboardEvent) {
		if (!(e.key == 'Enter' || e.key == ' ' || e.key == 'a')) {
			return;
		}
	}
	const filterRoute = routes.find(route => route.viewName === 'filterview');
	window.history.pushState({}, '', filterRoute?.path || '/filters');
};

export { SplashView, clearSplashEventListeners };