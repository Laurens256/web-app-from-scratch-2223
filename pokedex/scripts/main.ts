const init = async () => {
	const { router } = await import('./routing/router');
	window.addEventListener('hashchange', router);
	router();
};

init();