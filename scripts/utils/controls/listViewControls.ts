import { routes } from '../../routing/routes';

const listViewKeyDown = (e: KeyboardEvent) => {
	if(e.key !== 'b' && e.key !== 'Escape') return;
	e.preventDefault();
	const filterRoute = routes.find(route => route.viewName === 'filterview');

	if(filterRoute) {
		window.history.pushState({}, '', filterRoute.path);
	}
};

export { listViewKeyDown };