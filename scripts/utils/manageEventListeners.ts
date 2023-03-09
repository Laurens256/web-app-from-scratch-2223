interface eventListenerObj {
	target: Document | Window,
	event: 'keydown' | 'resize' | 'resize',
	callback: (e: any) => void
}

const currentEventListeners: eventListenerObj[] = [];

const setEventListeners = (eventListeners: eventListenerObj[]) => {
	eventListeners.forEach((eventListener) => {
		eventListener.target.addEventListener(eventListener.event, eventListener.callback);
		currentEventListeners.push(eventListener)
	});
};

const clearEventListeners  = () => {
	currentEventListeners.forEach((eventListener) => {
		eventListener.target.removeEventListener(eventListener.event, eventListener.callback);
	});
};

export { setEventListeners, clearEventListeners, eventListenerObj };