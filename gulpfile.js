var gulp = require('gulp');
var webserver = require('gulp-webserver');
var nib = require('nib');
var stylus = require('gulp-stylus');
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');

var config = {
	styles: {
		watch: './src/styles/*.styl',
		output: './build/css/'
		},
	html:{
		watch: './src/*.jade',
		output: './build'
	}
}

gulp.task('server',function(){
	gulp.src('./build')
	.pipe(webserver({
		host: '0.0.0.0',
		port: '8080',
		livereload: true
		}));
	});

gulp.task('render-html',function(){
	gulp.src(config.html.watch)
	.pipe(jade({
		pretty:true
		}))
	.pipe(gulp.dest(config.html.output));
	});

gulp.task('render-css',function(){
	gulp.src(config.styles.watch)
	.pipe(stylus({
		use:nib(),
		'include css':true
		}))
	.pipe(minifyCss())
	.pipe(gulp.dest(config.styles.output));
	});

gulp.task('watch',function(){
	gulp.watch(config.html.watch, ['render-html']);
	gulp.watch(config.styles.watch, ['render-css']);
	});

gulp.task('default',['server','watch']);