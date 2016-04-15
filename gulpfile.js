var gulp = require('gulp'); // sirve para llamar la dependencia de gulp (GULP es un automatizador de tareas)
var webserver = require('gulp-webserver'); // sirve para llamar la dependencia de GULP-SERVER y montar un servidor con gulp
var nib = require ('nib');// sirve para llamar un plugin NIB que lo utilizamos para agregar prefijos a propiedades CSS para la compatibilidad en todos los navegadores
var stylus = require ('gulp-stylus');//sirve para llamar al plugin stylus y poder crear codigo CSS optimizado y con mejores utilidades, funciones variables etc
var minifyCSS = require ('gulp-minify-css');// sirve para minificar el css con un mejor algoritmo
var jade = require ('gulp-jade');// sirve para llamar al plugin de jade y crear el html minifcado optimizado para produccion
var imagesop = require ('gulp-image-optimization'); // sirve para llamar al plugin de gulp para optimizar imagenes

var config = {
	styles: {
		watch: './src/styles/*.styl',
		output: './build/css'
	},
	//para el index
	/*html: {
		watch: './src/*.jade',
		output: './build/'
	}*/
	//para las demas paginas
	html: {
		watch: './src/pag/*.jade',
		output: './build/pag'
	}
	,
	imagenes: {
		watch:['./build/img/*.png', './build/img/*.jpg'],
		output: './build/imgop'
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
	pretty:false
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

gulp.task('image', function(){
gulp.src(config.imagenes.watch)
.pipe(imagesop({
	optimizationLevel:5,
	progressive:true,
	interlaced:true
	}))
.pipe(gulp.dest(config.imagenes.output));
});

gulp.task('watch', function(){
	//gulp.watch(config.styles.watch, ['image']);
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.html.watch, ['build:html']);
});


//gulp.task('default', ['server', 'watch', 'image']);
gulp.task('default', ['server', 'watch']);


