import { ListView } from '../views/listView';
import { DetailView } from '../views/detailView';
import { FilterView } from '../views/filterView';

type viewNames = 'listview' | 'detailview' | 'filterview';
interface Route {
	path: string;
	view: (params?: string) => void;
	viewName: viewNames;
}

const routes: Route[] = [
	{ path: '/pokemon', view: ListView, viewName: 'listview' },
	{ path: '/pokemon/:name', view: DetailView, viewName: 'detailview' },
	{ path: '/filters', view: FilterView, viewName: 'filterview' }
];

export { routes, viewNames };
