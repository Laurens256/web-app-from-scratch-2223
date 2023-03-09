import { routes } from './routes';
import { fadeTransition } from '../utils/fadeTransition';
import { HeaderView } from '../views/headerView';
import { FooterView } from '../views/footerView';

const mainElement = document.querySelector('main') as HTMLElement;
let currentView: typeof routes[number];

const router = async () => {
	const path = window.location.pathname;

	const test = await findRoute();

	const { route, param } = await findRoute();

	// const route = routes.find((_route) => {
	// 	// kijk of de huidige path evenveel delen heeft als de route
	// 	const urlPathSegments = path.split('/').slice(1).filter((segment) => segment);
	// 	const routeSegments = _route.path.split('/').slice(1).filter((segment) => segment);
	// 	if (urlPathSegments.length !== routeSegments.length) return false;

	// 	// loop om te kijken welk deel van de route een parameter is
	// 	let param!: string;
	// 	for (let i = 0; i < routeSegments.length; i++) {
	// 		if (routeSegments[i].startsWith(':')) {
	// 			param = urlPathSegments[i];
	// 		} else if (routeSegments[i] !== urlPathSegments[i]) {
	// 			// als de route niet overeenkomt met de url en geen param is gevonden, bestaat de route niet
	// 			return false;
	// 		}
	// 	}
	// 	mainElement.className = _route.viewName;

	// 	// haal oude event listeners weg
	// 	if (currentView && currentView.clearEventListeners) {
	// 		currentView.clearEventListeners.forEach((clearEventListener) => clearEventListener());
	// 	}

	// 	currentView = _route;
	// 	fadeTransition().then(() => {
	// 		HeaderView(_route.viewName);
	// 		FooterView(_route.viewName);
	// 		_route.view(param);
	// 	});
	// 	return true;
	// });
	if (!route) {
		const errorRoute = routes.find((_route) => _route.viewName === 'errorview');
		if (errorRoute) {
			// haal oude event listeners weg
			if (currentView && currentView.clearEventListeners) {
				currentView.clearEventListeners.forEach((clearEventListener) => clearEventListener());
			}
			currentView = errorRoute;
			HeaderView(errorRoute.viewName);
			FooterView(errorRoute.viewName);
			errorRoute.view();
		}
	}
};

const findRoute = async () => {
	const path = window.location.pathname;
	const urlPathSegments = path.split('/').slice(1).filter((segment) => segment);

	routeLoop:
	for (const [i, route] of routes.entries()) {
		const routeSegments = route.path.split('/').slice(1).filter((segment) => segment);
		if (urlPathSegments.length !== routeSegments.length) continue;

		// loop om te kijken welk deel van de route een parameter is
		let param: string = '';
		for (let i = 0; i < routeSegments.length; i++) {
			if (routeSegments[i].startsWith(':')) {
				param = urlPathSegments[i];
			} else if (routeSegments[i] !== urlPathSegments[i]) {
				// als de route niet overeenkomt met de url en geen param is gevonden, bestaat de route niet
				continue routeLoop;
			}
		}

		return { route, param };
	}
}

// findRoute();

export { router, mainElement };
