const loadTemplate = async (templateName: string) => {
	const template = await (await fetch(`/templates/${templateName}.tmpl`)).text();
	return template;
};

export { loadTemplate };
