const gulp = require('gulp');
const zip = require('gulp-zip');

module.exports = function zip_folder() {
	return gulp.src('build/**/*')
		.pipe(zip('layout.zip'))
		.pipe(gulp.dest('archive'))
};

