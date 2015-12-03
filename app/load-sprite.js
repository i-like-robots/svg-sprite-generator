'use strict';

const fs = require('fs');
const cheerio = require('cheerio');

module.exports = class LoadSprite {

	constructor() {
		this.spriteSrc = fs.readFileSync(process.cwd() + '/output/svg/sprite.css.svg');
		this.$ = cheerio.load(this.spriteSrc.toString(), { xmlMode: true });
	}

	getIcons() {
		return this.$('svg[id]');
	}

	getIconIds() {
		let ids = [];
		this.getIcons().each((i, el) => ids.push(cheerio(el).attr('id')));
		return ids;
	}

	getIconById(id) {
		const $icon = this.$(`svg#${id}`);

		if (!$icon.length) {
			throw Error(`Icon '#${id}' not found`);
		}

		return $icon;
	}

	getIconSize(id) {
		const $icon = this.getIconById(id);
		return { width: $icon.attr('width'), height: $icon.attr('height') };
	}

	getPathFor(id) {
		return this.getIconById(id).children().removeAttr('fill');
	}

};
