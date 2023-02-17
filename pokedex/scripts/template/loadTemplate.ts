import { getTypeBadge } from '../drawTypes';
import { Pokemon } from '../../assets/types';

(() => {
	async function mainn() {
		const ophefjesJson = await (await window.fetch('./ophefjes.json')).json();
		const template = await (await window.fetch('./article.tmpl')).text();
		const ophefSectie = document.querySelector('section.opheffen');

		ophefjesJson.forEach((ophefData) => {
			const datum = new Date(ophefData.datum);
			const weekdag = datum.toLocaleDateString('nl', { weekday: 'long' });
			const datumCijfers = datum.toLocaleDateString('nl', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			});
			const ophefId = `${ophefData.titel
				.substring(0, 20)
				.toLowerCase()
				.replaceAll(' ', '-')
				.replaceAll('.', '-')
				.replaceAll("'", '')
				.replaceAll('"', '')
				.replace(/-\s*$/, '')}-${ophefData.id}`;

			const teVervangen = {
				titel: ophefData.titel,
				twitterLink: ophefData.twitterLink,
				twitterLabel: ophefData.twitterLabel,
				weekdag: weekdag,
				datumCijfers: datumCijfers,
				datumISO: datum.toISOString(),
				ophefId: ophefId
			};

			// @ts-ignore
			ophefSectie.innerHTML += vulTemplate(template, teVervangen);
		});
	}

	function vulTemplate(template, tokens) {
		let html = template;

		Object.keys(tokens).forEach((token) => {
			const re = new RegExp(`{{${token}}}`, 'g');
			html = html.replace(re, tokens[token]);
		});
		return html;
	}

	// window.addEventListener('DOMContentLoaded', mainn);
})();

const loadTemplate = async (templateName: string, data: any) => {
	const template: string = await (
		await window.fetch(`/templates/${templateName}.tmpl`)
	).text();

	const html = fillTemplate(template, data);
	return html;
};

const fillTemplate = (template: string, data: Pokemon | any) => {
	let html = template;
	
	Object.keys(data).forEach((key) => {
		const re = new RegExp(`{{${key}}}`, 'g');
		if (key === 'types') {
			let typeBadges = '';
			data[key].forEach((type) => {
				typeBadges += getTypeBadge(type.type.name).outerHTML;
			});
			html = html.replace(re, typeBadges);
		} else {
			html = html.replace(re, data[key]);
		}
	});
	return html;
};

export { loadTemplate };
