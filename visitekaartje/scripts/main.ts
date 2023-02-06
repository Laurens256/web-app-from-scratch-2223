const albumPages: NodeListOf<HTMLElement> = document.querySelectorAll('.album > section');

const initAlbum = () => {
	for (let i = 0; i < albumPages.length; i++) {
		albumPages[i].style.zIndex = String(albumPages.length - i);
	}
};

const nextButton = document.querySelector('.next-page-btn')!;
const prevButton = document.querySelector('.prev-page-btn')!;

let currentPage = 0;
const nextPage = () => {
	if (currentPage >= albumPages.length - 1) return;

	albumPages[currentPage].classList.add('flipped');
	console.log(albumPages[currentPage]);
	albumPages[currentPage].addEventListener(
		'transitionend',
		() => {
			albumPages[currentPage].style.zIndex = '0';
			currentPage++;
		},
		{ once: true }
	);
};

const prevPage = () => {
	if (currentPage <= 0) return;
	currentPage--;
	albumPages[currentPage].classList.remove('flipped');
	albumPages[currentPage].style.zIndex = String(albumPages.length - currentPage);
};

nextButton.addEventListener('click', nextPage);
prevButton.addEventListener('click', prevPage);

initAlbum();
