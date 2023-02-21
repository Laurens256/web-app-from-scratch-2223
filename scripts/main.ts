import { router } from './routing/router';

const init = async () => {
	window.addEventListener('popstate', router);
	router();
};

// code van: https://stackoverflow.com/questions/4570093/how-to-get-notified-about-changes-of-the-history-via-history-pushstate zorgt ervoor dat router function wordt uitgevoerd op history pushstate en replacestate
type HistoryState = (data: string, title: string, url?: string | null) => void;

window.history.pushState = new Proxy(window.history.pushState, {
	apply: (target: HistoryState, thisArg: string, argArray: string[]) => {
		target.apply(thisArg, argArray);
		router();
	}
});

window.history.replaceState = new Proxy(window.history.replaceState, {
	apply: (target: HistoryState, thisArg: string, argArray: string[]) => {
		target.apply(thisArg, argArray);
		router();
	}
});

init();
