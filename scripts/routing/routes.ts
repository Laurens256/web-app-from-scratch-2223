import { SplashView, clearSplashEventListeners } from '../views/splashView';
import { ListView, clearListViewEventListeners } from '../views/listView';
import { DetailView, clearDetailEventListeners } from '../views/detailView';
import { FilterView, } from '../views/filterView';
import { ErrorView, clearErrorEventListeners } from '../views/errorView';
import { clearListEventListeners } from '../utils/manageListScroll';

type viewNames = 'listview' | 'detailview' | 'filterview' | 'splashview' | 'errorview';
interface Route {
	path: string;
	view: (params?: string) => void;
	viewName: viewNames;
	clearEventListeners?: (() => void)[];
}

const routes: Route[] = [
	{ path: '', view: ErrorView, viewName: 'errorview', clearEventListeners: [clearErrorEventListeners] },
	{ path: '/', view: SplashView, viewName: 'splashview', clearEventListeners: [clearSplashEventListeners] },
	{ path: '/pokemon', view: ListView, viewName: 'listview', clearEventListeners: [clearListEventListeners, clearListViewEventListeners] },
	{ path: '/pokemon/:name', view: DetailView, viewName: 'detailview', clearEventListeners: [clearDetailEventListeners] },
	{ path: '/filters', view: FilterView, viewName: 'filterview', clearEventListeners: [clearListEventListeners] },
];

// sort routes array to make sure error route is last
routes.sort((a, b) => {
	if (a.viewName === 'errorview') return 1;
	if (b.viewName === 'errorview') return -1;
	return 0;
});



export { routes, viewNames };
