'use strict';

const express = require('express');
const LoadSprite = require('./app/load-sprite');
const GenerateSprite = require('./app/generate-sprite');

let app = express();
let sprite = new LoadSprite();
let generate = new GenerateSprite(sprite);

app.get('/', function (request, response) {
	console.log(JSON.stringify(request.query, null, 2));

	try {
		const svg = generate.withParams(request.query);

		response.set('Content-Type', 'image/svg+xml');
		response.send(svg);
	} catch(e) {
		console.error(e.toString());
		response.sendStatus(500);
	}

});


const port = process.env.port || 3000;
app.listen(port);
console.log('App listening on http://localhost:3000');