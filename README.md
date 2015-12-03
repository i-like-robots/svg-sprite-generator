# SVG sprite generator

A experimental SVG sprite generation service prototype.

## Setup

```sh
# Clone this repo
git clone git@github.com:i-like-robots/svg-sprite-generator.git
cd svg-sprite-generator/

# Install project dependencies
npm install

# For SVG -> PNG conversion use ImageMagick + librsvg
brew install imagemagick --with-librsvg

# or if you have ImageMagick installed already but not librsvg...
brew reinstall imagemagick --with-librsvg
```

### Prepare SVGs

1. Place individual SVG icon files into `source/svg/` folder
2. Run `gulp` which will generate a single file in the `output/svg/` folder

### Run the server

```sh
# For development
nodemon server.js

# For production
npm start
```

## Usage

```
# To view available colors
http://localhost:3000/colors

# To view available icons
http://localhost:3000/icons

# To fetch all icons and default colors
http://localhost:3000/

# To fetch specific icons and specified colors
http://localhost:3000/?colors=000,666,fff&icons=arrow-left,arrow-right,arrow-up,arrow-down
```
