import { User } from 'assets/types';
import { defaultUserData, defaultQuote } from './defaultData';
import * as sanitizeHtml from 'sanitize-html';

const container = document.querySelector('.container')!;
const pageControls = document.querySelectorAll('.controls button')!;

const defaultUserId = 'cldep8zqq3wbh0av00ktcml8w';
const defaultSquadId = 'cldcspecf0z0o0bw59l8bwqim';

// fetch user profiel
const fetchUser = async () => {
	container.classList.add('loading');
	const id = new URLSearchParams(window.location.search).get('id') || defaultUserId;
	let user!: User;
	try {
		user = await (await fetch(`https://whois.fdnd.nl/api/v1/member?id=${id}`)).json();
	} catch {
		user = defaultUserData;
		console.log('Fout bij het ophalen van data, standaard gebruiker wordt geladen');
	}
	generateAlbum(user.member);
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

// laadt data in visitekaartje
const generateAlbum = (user: User['member']) => {
	albumCover.addEventListener('load', () => {
		container.classList.remove('loading');
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
					'h1': 'h2',
				  }
			})}"</blockquote>`;
		} else {
			albumCoverBack.innerHTML = `<blockquote>${defaultQuote}</blockquote>`;
		}
	});
	albumCover.src = user.avatar || '/img/default-cover.jpg';
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
