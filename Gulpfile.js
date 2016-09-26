// Plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');

// Paths
var sassPath = './src/sass/*.scss';
var cssPath = './public/css';

gulp.task('sass', function () {
	return gulp
		.src(sassPath)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(cssPath));
});

gulp.task('sass-prod', function() {
	return gulp
		.src(sassPath)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest(cssPath));
});

gulp.task('watch', function() {
	return gulp
		.watch('./src/**/*.{html,scss}', ['sass', 'index-html'])
		.on('change', function(event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('index-html', function() {
	gulp.src('./src/index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./public/'));
});

gulp.task('default', ['sass', 'index-html', 'watch']);

gulp.task('production', ['sass-prod', 'index-html']);