'use strict';

const express = require('express');
const LoadSprite = require('./app/load-sprite');
const GenerateSprite = require('./app/generate-sprite');
const pngConversion = require('./app/png-conversion');

let app = express();
let sprite = new LoadSprite();
let generate = new GenerateSprite(sprite);

app.get('/', function (request, response) {
	console.log(JSON.stringify(request.query, null, 2));

	try {
		const svg = generate.withParams(request.query);

		if (request.query.format && request.query.format === 'png') {
			pngConversion(svg).then(output => {
				response.set('Content-Type', 'image/png');
				response.end(output, 'binary');
			});
		} else {
			response.set('Content-Type', 'image/svg+xml');
			response.send(svg);
		}
	} catch(e) {
		console.error(e.toString());
		response.status(500).send(e.toString());
	}

});

app.get('/icons', function (request, response) {
	response.json(generate.defaults.icons);
});

app.get('/colors', function (request, response) {
	response.json(generate.defaults.colors);
});

const port = process.env.port || 3000;
app.listen(port);
console.log('App listening on http://localhost:3000');
