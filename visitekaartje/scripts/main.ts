const container = document.querySelector('.container')!;
const pageControls = document.querySelectorAll('.controls button')!;

const defaultUserId = 'cldep8zqq3wbh0av00ktcml8w';
const defaultSquadId = 'cldcspecf0z0o0bw59l8bwqim';
const fetchUser = async () => {
	const id = new URLSearchParams(window.location.search).get('id') || defaultUserId;
	const data = await (await fetch(`https://whois.fdnd.nl/api/v1/member?id=${id}`)).json();
	console.log(data);
};

// fetchUser();

const changePage = (e: Event) => {
	const target = e.currentTarget as HTMLElement;
	// check of pagina verder naar voren of naar achter kan, anders return
	if (
		(target.classList.contains('next-page-btn') &&
			container.classList.contains('flipped')) ||
		(target.classList.contains('prev-page-btn') &&
			!container.classList.contains('flipped'))
	) {
		return;
	}
	container.classList.toggle('flipped');
};

pageControls.forEach((button) => button.addEventListener('click', changePage));