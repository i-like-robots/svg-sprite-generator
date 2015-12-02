'use strict';

const defaults = {
  colors: [
    '000',
    '777',
    'fff',
    'f00',
    '0f0',
    '00f'
  ],
  icons: [
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'arrow-up'
  ]
};

function templatePaths(sprite, iconIds) {
  const elements = iconIds.map(
    iconId => `<g id="${iconId}">${sprite.getPathFor(iconId).toString()}</g>`
  );

  return elements.join('\n');
}

function templateColors(sprite, iconIds, colors) {
  const elements = colors.map(
    (color, colorIndex) => `<g fill="#${color}">${templateLinks(sprite, iconIds, colorIndex)}</g>`
  );

  return elements.join('\n');
}

function templateLinks(sprite, iconIds, colorIndex) {
  const dimensions = sprite.getIconSize();

  const elements = iconIds.map(
    (iconId, iconIndex) => {
      const x = dimensions.width * iconIndex;
      const y = dimensions.height * colorIndex;

      return `<use xlink:href="#${iconId}" transform="translate(${x} ${y})"></use>`;
    }
  );

  return elements.join('\n');
}

module.exports = class GenerateSprite {

  constructor(sprite) {
    this.sprite = sprite;
  }

  withParams(params) {
    const dimensions = this.sprite.getIconSize();
    const options = {
      colors: params.colors ? params.colors.split(',') : defaults.colors,
      icons: params.icons ? params.icons.split(',') : defaults.icons
    };

    const width = dimensions.width * options.icons.length;
    const height = dimensions.height * options.colors.length;

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
        ${templatePaths(this.sprite, options.icons)}
        </defs>
        ${templateColors(this.sprite, options.icons, options.colors)}
      </svg>
    `;
  }

}
