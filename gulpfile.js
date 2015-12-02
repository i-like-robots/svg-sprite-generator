'use strict';

const gulp = require('gulp');
const svgSprite	= require('gulp-svg-sprite');

gulp.task('default', () => {

	const config = {
		shape: {
			dimension: {
				precision: 5
			},
			transform: ['svgo']
		},
		mode: {
			css: {
				dest: '',
				bust: false,
				layout: 'horizontal'
			}
		}
	};

	gulp.src('source/svg/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('output/'));

});
