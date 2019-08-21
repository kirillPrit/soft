var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

function styles() {
	return gulp.src('./src/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		 browsers: ['last 2 versions'],
		 cascade: false
	}))
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
}
function scripts() {
	return gulp.src('./src/js/*.js')
	.pipe(uglify({
    	toplevel: true
  	 }))
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream());
}
function watchFile() {
	browserSync.init({
		server: {
			baseDir: './'
		},
		port: 3000
	});
	gulp.watch('./src/scss/*.scss', styles)
	gulp.watch('./src/js/*.js', scripts)
	gulp.watch('./index.html').on('change', browserSync.reload);
}

gulp.task('default', watchFile);
