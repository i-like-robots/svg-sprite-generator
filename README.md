# SVG sprite generator

A experimental SVG sprite generation service prototype.

## Setup

```sh
git clone git@github.com:i-like-robots/svg-sprite-generator.git
cd svg-sprite-generator/
npm install
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
curl http://localhost:3000/?colors=000,f00,00f,0f0,666&icons=arrow-left,arrow-right,arrow-up,arrow-down
```
