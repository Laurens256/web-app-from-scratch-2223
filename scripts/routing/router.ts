import { routes } from './routes';
import { clearListEventListeners } from '../utils/manageListScroll';
import { clearDetailEventListeners } from '../views/detailView';
import { fadeTransition } from '../utils/fadeTransition';

const mainElement = document.querySelector('main') as HTMLElement;

const router = () => {
	const path = window.location.pathname;
	const route = routes.find((_route) => {
		// kijk of de huidige path evenveel delen heeft als de route
		const urlPathSegments = path.split('/').slice(1);
		const routeSegments = _route.path.split('/').slice(1);
		if (urlPathSegments.length !== routeSegments.length) return false;

		// loop om te kijken welk deel van de route een parameter is
		// const params: string[] = [];
		let param!: string;
		for (let i = 0; i < routeSegments.length; i++) {
			if (routeSegments[i].startsWith(':')) {
				param = urlPathSegments[i];
				// params.push(urlPathSegments[i]);
			} else if (routeSegments[i] !== urlPathSegments[i]) {
				// als de route niet overeenkomt met de url en geen param is gevonden, bestaat de route niet
				return false;
			}
		}
		// async werkt niet dus dan maar zo
		fadeTransition().then(() => {
			_route.view(param);
		});
		return true;
	});
	if (!route) {
		mainElement.innerHTML = '<h1>404 Page Not Found</h1>';
	}
};

// haalt oude eventlisteners weg als view wordt verwijderd
const callback = (mutationList: { removedNodes: NodeList }[]) => {
	const removedNode = mutationList[0].removedNodes[0] as HTMLElement;
	if (removedNode) {
		if (removedNode.id === 'listview') {
			clearListEventListeners();
		} else if (removedNode.id === 'detailview') {
			clearDetailEventListeners();
		}
	}
};

const observer = new MutationObserver(callback);
observer.observe(mainElement, { childList: true });

export { router, mainElement };
