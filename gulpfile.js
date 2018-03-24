var gulp 			= require('gulp');
var clean 			= require('gulp-clean');
var concat 			= require('gulp-concat');
var sass 			= require('gulp-sass');
var uglify 			= require('gulp-uglify');
var runSequence 	= require('run-sequence');

var buildDir 		= 'bin/';

var depsJS 		 = ['node_modules/jquery/dist/jquery.min.js',
					'node_modules/bootstrap/dist/js/bootstrap.min.js',
					'node_modules/angular/angular.min.js',
					'node_modules/angular-route/angular-route.min.js'];					

var appJS 			= ['client/resources/js/app.js',
						'client/resources/js/controllers.js',
						'client/resources/js/directives.js',
						'client/resources/js/services.js'];						

/** tasks **/
gulp.task('devDeps', function ()
{
	var depsjs = gulp.src(depsJS);
	return depsjs.pipe(concat('mcu_deps.js'))
		.pipe(gulp.dest('client'));
});

gulp.task('devJS', function ()
{
	var js = gulp.src(appJS);
	return js.pipe(concat('mcu.js'))
		.pipe(gulp.dest('client'));
});

/** sass tasks **/
gulp.task('sass', function ()
{
	return gulp.src(['client/resources/css/styles.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('client/resources/css'));
});

gulp.task('devCSS', function ()
{
	return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css','client/resources/css/styles.css'])
		.pipe(concat('mcu.css'))
		.pipe(gulp.dest('client/resources/css/'));
});

gulp.task('buildStyles', function (callback)
{
	runSequence('sass', 'devCSS', callback);
});

/** initialize **/
gulp.task('default', function (callback)
{
	runSequence('devDeps', 'devJS', callback);
});



/** watch **/
gulp.task('watch', function ()
{
	gulp.watch('client/resources/**/*.js', ['devJS']);
	gulp.watch('client/resources/**/*.scss', ['buildStyles']);
});