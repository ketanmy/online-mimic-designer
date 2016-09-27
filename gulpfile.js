
var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify2');
var babelify = require('babelify');
var watch = require('watchify');
var del = require('del');
var sass = require('gulp-sass');
var mocha = require('gulp-mocha');

var cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 8800,		
	});
})

gulp.task('clean-script', function () {
	del(['public/dist/js/']);
})

gulp.task('clean-css', function () {
	del(['public/dist/styles/']);
})

gulp.task('browserify', ['clean-script'], function () {

	return gulp.src('public/js/app.js')
		.pipe(browserify({
			transform: babelify,
			options: {
				debug: true
			}
		}))
		.pipe(gulp.dest('public/dist/js/'));
});

gulp.task('sass', ['clean-css'], function () {
	gulp.src('public/styles/image-widget/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/dist/styles/'));
});

gulp.task('test', function () {
	return gulp.src("test/**/*/*.js")
		.pipe(mocha({
			compilers: {
				js: require('babel-core/register')
			}
		}));
});

gulp.task('watch', function () {
	gulp.watch('public/js/**/**/*.js', ['browserify']);
	gulp.watch('public/styles/image-widget/*.scss', ['sass']);
});


gulp.task('default', ['connect', 'watch', 'browserify', 'sass']);