import { ListView } from '../views/listView';
import { DetailView } from '../views/detailView';
import { FilterView } from '../views/filterView';

interface Route {
	path: string;
	view: (params?: string) => void;
}

const routes: Route[] = [
	{ path: '/', view: ListView },
	{ path: '/pokemon/:name', view: DetailView },
	{ path: '/placeholder', view: FilterView }
];

export { routes };
