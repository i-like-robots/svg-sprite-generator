'use strict';

const spawn = require('child_process').spawn;

module.exports = function(svg) {
	return new Promise(function(resolve, reject) {
		let output = [];
		let errors = [];
		let settings = [
			'-quality', '95',
			'-colors', '256',
			'-depth', '8',
			'+dither',
			// '-channel', 'A', '-level', '20,100%,0.85', '+channel',
			'-background', 'none',
			'-alpha', 'background'
		];

		const env = {};
		const convert = spawn('convert', [].concat(settings, 'svg:-', 'png:-'));

		convert.stdin.write(svg);

		convert.stdin.end();

		convert.stdout.on('data', data => {
			output.push(data);
		});

		convert.stderr.on('data', error => {
			errors.push(error.toString());
		});

		convert.on('error', error => {
			reject(error.toString());
		});

		convert.on('close', code => {
			if (code !== 0) {
				return reject('convert exited with code ' + code + ': ' + errors);
			}

			resolve(Buffer.concat(output));
		});
	});
};
