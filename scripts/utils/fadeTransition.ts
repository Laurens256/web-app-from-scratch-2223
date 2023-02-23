const body = document.querySelector('body') as HTMLElement;
const fadeDiv = document.querySelector('div.fadetransition') as HTMLElement;

const fadeLength = 500;
fadeDiv.style.setProperty('--fade-length', `${fadeLength}ms`);


const fadeTransition = async () => {
	body.classList.add('fade');
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			body.classList.remove('fade');
			resolve();
		}, fadeLength);
	});
};

export { fadeTransition };
