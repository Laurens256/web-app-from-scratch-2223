import { SplashView } from '../views/splashView';
import { ListView } from '../views/listView';
import { DetailView } from '../views/detailView';
import { FilterView } from '../views/filterView';
import { ErrorView } from '../views/errorView';

type viewNames = 'listview' | 'detailview' | 'filterview' | 'splashview' | 'errorview';
interface Route {
	path: string;
	view: (params?: string) => void;
	viewName: viewNames;
}

const routes: Route[] = [
	{ path: '/', view: SplashView, viewName: 'splashview' },
	{ path: '/pokemon', view: ListView, viewName: 'listview' },
	{ path: '/pokemon/:name', view: DetailView, viewName: 'detailview' },
	{ path: '/filters', view: FilterView, viewName: 'filterview' },
	{ path: '', view: ErrorView, viewName: 'errorview' },
];

export { routes, viewNames };
