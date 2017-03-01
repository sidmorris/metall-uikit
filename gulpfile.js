var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		browserSync    = require('browser-sync').create(),
		less           = require('gulp-less'),
		sourcemaps     = require('gulp-sourcemaps'),
		autoprefixer   = require('gulp-autoprefixer'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		path           = require('path');
 

gulp.task('serve', ['less'], function() {

    browserSync.init({
			server: {
				baseDir: 'app'
			},
			notify: false,
    });

    gulp.watch("app/less/**/*.less", ['less']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
}); 
 
 
 
 
gulp.task('less', function () {
  return gulp.src('app/less/*.less')
		.pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['serve']);