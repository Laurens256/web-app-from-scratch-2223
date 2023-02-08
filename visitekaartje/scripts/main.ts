import { User } from 'assets/types';
import { defaultUserData, defaultQuote } from './defaultData';
// import * as sanitizeHtml from 'sanitize-html';
import sanitizeHtml from 'sanitize-html';

const container = document.querySelector('.container')!;
const pageControls: HTMLButtonElement = document.querySelector('.togglepage')!;

const id = new URLSearchParams(window.location.search).get('id');
const slug = new URLSearchParams(window.location.search).get('slug');
const defaultSlug = 'garfield-enjoyer';
const defaultId = 'cldep8zqq3wbh0av00ktcml8w';

if (!slug && !id) {
	window.history.replaceState('slug', 'slug', `?slug=${defaultSlug}`);
}

// fetch user profiel
const fetchUser = async () => {
	container.classList.add('loading');
	let user!: User;
	let url = `https://whois.fdnd.nl/api/v1/member/${slug || defaultSlug}`;
	if (id) url = `https://whois.fdnd.nl/api/v1/member?id=${id}`;

	try {
		user = await (await fetch(url)).json();
		if (!user.member) throw new Error();
	} catch {
		user = defaultUserData;
		id
			? window.history.replaceState('id', 'id', `?id=${defaultId}`)
			: window.history.replaceState('slug', 'slug', `?slug=${defaultSlug}`);

		console.log('Fout bij het ophalen van data, standaard gebruiker wordt geladen');
	}
	loadCover(user.member);
};

const albumCover: HTMLImageElement = document.querySelector(
	'.album section:first-of-type article:first-of-type img'
)!;
const albumTitle: HTMLHeadingElement = document.querySelector(
	'.album section:first-of-type article:first-of-type h1'
)!;
const albumCoverBackQuote: Element = document.querySelector(
	'.album section:first-of-type article:last-of-type blockquote'
)!;

const loadCover = (user: User['member']) => {
	albumCover.addEventListener('error', () => {
		generateAlbum(user);
		container.classList.add('imgerror');
	});
	albumCover.addEventListener('load', () => {
		generateAlbum(user);
	});
	albumCover.src = user.avatar;
};

// laadt data in visitekaartje
const generateAlbum = (user: User['member']) => {
	if (user.name) {
		albumCover.alt = `avatar van ${user.name}`;
		albumTitle.textContent = user.name;
	} else {
		albumCover.alt = 'albumhoes';
	}

	if (user.nickname) {
		albumTitle.textContent = user.nickname;
	}

	if (user.bio.html) {
		albumCoverBackQuote.innerHTML = `"${sanitizeHtml(user.bio.html, {
			// prettier-ignore
			allowedTags: ['p', 'b', 'i', 'em', 'strong', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'],
			transformTags: { h1: 'h2' }
		})}"`;
	} else {
		albumCoverBackQuote.textContent = `"${defaultQuote}"`;
	}
	container.classList.remove('loading');
};

pageControls.addEventListener('click', () => {
	container.classList.toggle('flipped');
});

fetchUser();
