var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var rimraf = require('rimraf');

gulp.task('default', ['build']);

gulp.task('build', ['compilejs']);

gulp.task('compilejs', function(cb) {
	var stream = rjs({
		baseUrl: 'src',
		include: ['requireLib'],
		paths: {
			'requireLib': 'require',
			'jquery': 'jquery.2.2.0'
		},
		shim: {
			'jquery': 'jquery-private'
		},
		namespace: 'civ2',
		out: 'civilization2.js',
		name: 'civilization2'
	}).pipe(gulp.dest('./content/scripts'))
	.pipe(uglify())
	.pipe(rename({'suffix': '.min'}))
	.pipe(gulp.dest('./content/scripts'));

	return stream;
});

gulp.task('watch', function(cb) {
	var stream = gulp.watch('src/**/*.js', ['build']);
	return stream;
})