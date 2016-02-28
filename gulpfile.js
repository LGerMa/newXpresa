var gulp = require('gulp'); // sirve para llamar la dependencia de gulp (GULP es un automatizador de tareas)
var webserver = require('gulp-webserver'); // sirve para llamar la dependencia de GULP-SERVER y montar un servidor con gulp
var nib = require ('nib');// sirve para llamar un plugin NIB que lo utilizamos para agregar prefijos a propiedades CSS para la compatibilidad en todos los navegadores
var stylus = require ('gulp-stylus');//sirve para llamar al plugin stylus y poder crear codigo CSS optimizado y con mejores utilidades
var minifyCSS = require ('gulp-minify-css');
var jade = require ('gulp-jade');


var config = {
	styles: {
		watch: './src/styles/*.styl',
		output: './build/css'
	},
	html: {
		watch: './src/*.jade',
		output: './build'
	}
}


gulp.task('server', function () {
	gulp.src('./build')
	.pipe(webserver({
		host: '0.0.0.0',
		port: '8080',
		livereload:true
	}));
});

gulp.task('build:html', function(){
gulp.src(config.html.watch)
.pipe(jade({
	pretty:true
}))
.pipe(gulp.dest(config.html.output));
});

gulp.task('build:css', function (){
	gulp.src(config.styles.watch)
	.pipe(stylus({
		use:nib(),
		'include css':true
	}))
	.pipe(minifyCSS())
	.pipe(gulp.dest(config.styles.output));
});


gulp.task('watch', function(){
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.html.watch, ['build:html']);
});


gulp.task('default', ['server', 'watch']);


