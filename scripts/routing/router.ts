import { routes } from './routes';
import { fadeTransition } from '../utils/fadeTransition';
import { HeaderView } from '../views/headerView';
import { FooterView } from '../views/footerView';

const mainElement = document.querySelector('main') as HTMLElement;
let currentView: typeof routes[number];

const router = async () => {
	// Find and return the route and parameter
	const { route, param } = await findRoute();

	if (currentView && currentView.clearEventListeners) {
		currentView.clearEventListeners.forEach((clearEventListener) => clearEventListener());
	}

	await fadeTransition();

	currentView = route;

	HeaderView(route.viewName);
	FooterView(route.viewName);
	route.view(param);
};

// function om de juiste route te vinden bij de url
const findRoute = async () => {
	const path = window.location.pathname;
	const urlPathSegments = path.split('/').slice(1).filter((segment) => segment);

	routeLoop:
	for (const [i, route] of routes.entries()) {
		const routeSegments = route.path.split('/').slice(1).filter((segment) => segment);
		// als het aantal segments van de route niet overeenkomt met die van de url, is dit niet de juiste route
		if (urlPathSegments.length !== routeSegments.length) continue;

		// loop om te kijken welk deel van de route een parameter is
		let param: string = '';
		for (let i = 0; i < routeSegments.length; i++) {
			if (routeSegments[i].startsWith(':')) {
				param = urlPathSegments[i];
			} else if (routeSegments[i] !== urlPathSegments[i]) {
				// als de route niet overeenkomt met de url en geen param is gevonden, is dit niet de juiste route
				continue routeLoop;
			}
		}

		return { route: route, param: param };
	}
	const errorRoute = routes[routes.length - 1];
	return { route: errorRoute, param: undefined };
}


export { router, mainElement };
