'use strict';

const defaults = {
	colors: [
		'fff1e0',
		'000000',
		'ffffff',
		'2e6e9e',
		'275e86',
		'9e2f50',
		'd66d06',
		'b0b0b0',
		'999999',
		'777777',
		'505050',
		'333333',
		'f6e9d8',
		'e9decf',
		'cec6b9',
		'a7a59b',
		'74736c'
	],
	icons: []
};

function templateSymbols(sprite, options) {
	const elements = options.icons.map(icon => {
		const dimensions = sprite.getIconSize(icon);

		return `
			<symbol
				id="${icon}"
				width="${options.size}"
				height="${options.size}"
				viewBox="0 0 ${dimensions.width} ${dimensions.height}">
				${sprite.getPathFor(icon).toString()}
			</symbol>`;
	});

	return elements.join('\n');
}

function templateColorGroups(sprite, options) {
	const elements = options.colors.map((color, colorIndex) => `
		<g fill="#${color}">
			${templateLinks(sprite, options, colorIndex)}
		</g>
	`);

	return elements.join('\n');
}

function templateLinks(sprite, options, colorIndex) {
	const elements = options.icons.map((icon, iconIndex) => {
		const x = options.size * iconIndex;
		const y = options.size * colorIndex;

		return `<use xlink:href="#${icon}" x="${x}" y="${y}"></use>`;
	});

	return elements.join('\n');
}

module.exports = class GenerateSprite {

	constructor(sprite) {
		this.sprite = sprite;
		defaults.icons = this.sprite.getIconIds();
	}

	withParams(params) {
		const options = {
			colors: params.colors ? params.colors.split(',') : defaults.colors,
			icons: params.icons ? params.icons.split(',') : defaults.icons,
			size: params.size ? parseInt(params.size, 10) : 50
		};

		const width = options.size * options.icons.length;
		const height = options.size * options.colors.length;

		return `
			<svg
				version="1.1"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				xmlns="http://www.w3.org/2000/svg"
				width="${width}"
				height="${height}"
				viewBox="0 0 ${width} ${height}"
				preserveAspectRatio="none">
				<defs>
				${templateSymbols(this.sprite, options)}
				</defs>
				${templateColorGroups(this.sprite, options)}
			</svg>
		`;
	}

}
