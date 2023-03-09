import { mainElement } from '../routing/router';
import { routes } from '../routing/routes';
import { playBgMusic } from '../utils/soundEffects';

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
	splashDiv.addEventListener('click', moveScreen);

	splashImg = document.createElement('img');

	splashImg.addEventListener('load', manageSplashBg);

	bgText.textContent = 'Press to start';
	splashImg.src = '/img/splash.webp';
	splashImg.alt = 'pokemon fire red splash screen';

	splashDiv.appendChild(bgText);
	splashDiv.appendChild(splashImg);
	mainElement.appendChild(splashDiv);

	playBgMusic(false, false, 'title-screen');
	window.addEventListener('resize', manageSplashBg);
	document.addEventListener('keydown', moveScreen);
};

// zorgt ervoor dat de gradient achtergrond altijd goed aansluit
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