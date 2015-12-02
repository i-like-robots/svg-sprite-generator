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
