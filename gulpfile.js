const gulp = require('gulp');
const browserSync = require('browser-sync');
const zip = require('gulp-zip');
const del = require('del');

gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: 'localhost/development'
	});
	gulp.watch(['src/*.js', 'src/*.scss']).on('change', () => browserSync.reload());
});

gulp.task('clean', () => {
	return del([
		'languages',
		'bundled'
	]);
});

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