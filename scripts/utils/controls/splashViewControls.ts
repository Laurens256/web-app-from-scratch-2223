import { routes } from '../../routing/routes';
import { playBgMusic } from '../soundEffects';

const manageWindowResize = () => {
	const splashDiv = document.querySelector('.splashscreen');
	const splashImg = splashDiv?.querySelector('.splashscreen img');
	if(!splashDiv || !splashImg) return;
	
	if (splashImg.clientWidth >= window.innerWidth) {
		splashDiv.classList.add('fullwidth');
	} else {
		splashDiv.classList.remove('fullwidth');
	}
};

const handleScreenMove = (e: MouseEvent | KeyboardEvent) => {
	if (e instanceof KeyboardEvent) {
		if (!(e.key == 'Enter' || e.key == ' ' || e.key == 'a' || 'Escape')) {
			return;
		}

		if (e.key === 'Escape') {
			playBgMusic('driftveil');
		}
	}
	const filterRoute = routes.find((route) => route.viewName === 'filterview');
	window.history.pushState({}, '', filterRoute?.path || '/filters');
};

export { manageWindowResize, handleScreenMove };