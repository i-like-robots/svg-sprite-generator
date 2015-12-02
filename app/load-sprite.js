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

  getIconById(id) {
    return this.$(`svg#${id}`);
  }

  getIconSize(id) {
    const $icon = this.getIconById(id);
    return { width: $icon.attr('width'), height: $icon.attr('height') };
  }

  getPathFor(id) {
    return this.getIconById(id).children().removeAttr('fill');
  }

};
