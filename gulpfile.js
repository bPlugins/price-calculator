const gulp = require('gulp');
const zip = require('gulp-zip');

exports.bundle = () => (
	gulp.src([
		'**/*',
		'!bundled/**',
		'!node_modules/**',
		'!src/**',
		'!.eslintrc.js',
		'!.gitignore',
		'!gulpfile.js',
		'!package.json',
		'!package-lock.json',
		'!readme.md',
		'!webpack.config.js',
	])
		.pipe(zip('price-calculator.zip'))
		.pipe(gulp.dest('bundled'))
);