import { User } from 'assets/types';
import { defaultUserData } from './defaultData';
import * as sanitizeHtml from 'sanitize-html';

const container = document.querySelector('.container')!;
const pageControls = document.querySelectorAll('.controls button')!;

const slug = new URLSearchParams(window.location.search).get('slug');
const defaultSlug = 'garfield-enjoyer';

if (!slug) {
	window.history.pushState('slug', 'slug', `?slug=${defaultSlug}`);
}

// fetch user profiel
const fetchUser = async () => {
	container.classList.add('loading');
	let user!: User;
	try {
		user = await (
			await fetch(`https://whois.fdnd.nl/api/v1/member/${slug || defaultSlug}`)
		).json();
		if (!user.member) throw new Error();
	} catch {
		user = defaultUserData;
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
const albumCoverBack: Element = document.querySelector(
	'.album section:first-of-type article:last-of-type'
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
		albumCoverBack.innerHTML = `<blockquote>"${sanitizeHtml(user.bio.html, {
			// prettier-ignore
			allowedTags: ['p', 'b', 'i', 'em', 'strong', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'],
			enforceHtmlBoundary: true,
			transformTags: {
				h1: 'h2'
			}
		})}"</blockquote>`;
	}
	container.classList.remove('loading');
};

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

fetchUser();
