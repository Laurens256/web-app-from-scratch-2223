const container = document.querySelector('.container')!;
const albumPages: NodeListOf<HTMLElement> = document.querySelectorAll('.album > section');
const pageControls = document.querySelectorAll('.controls button')!;
const nextButton = document.querySelector('.next-page-btn')!;
const prevButton = document.querySelector('.prev-page-btn')!;

const initAlbum = () => {
	for (let i = 0; i < albumPages.length; i++) {
		albumPages[i].style.zIndex = String(albumPages.length - i);
	}
};

let pageState: 0 | 1 = 0;
const changePage = (e: Event) => {
	const target = e.currentTarget as HTMLElement;
	if (target.classList.contains('next-page-btn') && pageState === 0) {
		pageState = 1;
		albumPages[pageState - 1].classList.add('flipped');
	} else if (target.classList.contains('prev-page-btn') && pageState === 1) {
		pageState = 0;
		albumPages[pageState].classList.remove('flipped');
	} else {
		return;
	}
	container.classList.toggle('flipped');
};

pageControls.forEach((button) => button.addEventListener('click', changePage));

initAlbum();
