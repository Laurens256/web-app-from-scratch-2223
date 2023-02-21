import { ListView } from '../views/listView';
import { DetailView } from '../views/detailView';

interface Route {
	path: string;
	view: (params?: string) => void;
}

const routes: Route[] = [
	{ path: '/', view: ListView },
	{ path: '/pokemon/:name', view: DetailView }
];

export { routes };
