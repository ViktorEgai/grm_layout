const {
	src,
	dest
} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const bs = require('browser-sync');
const babel = require('gulp-babel');

module.exports = function dev_js() {
	return src(['src/components/**/*.js', 'src/js/**/*.js'])
		.pipe(map.init())
		.pipe(uglify())		
		.pipe(concat('main.min.js'))
		.pipe(map.write('../sourcemaps'))
		.pipe(dest('build/js/'))
		.pipe(dest('theme/js/'))
		.pipe(bs.stream())
}