var gulp = require('gulp');
var browserSync = require('browser-sync');
var pug = require('gulp-pug');
var merge = require('merge-stream');

var reload = browserSync.reload;

/**
 * copy dependencies to dist directory
 */
gulp.task('copy-deps', function() {
	gulp.src(['node_modules/font-awesome/css/*.min.*', 'node_modules/font-awesome/fonts/fontawesome-webfont.*'], {base : 'node_modules/font-awesome'})
	.pipe(gulp.dest('dist/assets/font-awesome/4.5.0'));

});

gulp.task('copy-vendor-files', function() {

	var externalAssets =  gulp.src('externalAssets/*/**')
		.pipe(gulp.dest('dist/assets'));
	// return merge(cpy1, cpy2,...)	
	return externalAssets;
})

/**
 * copy assets to dist directory
 */
gulp.task('copy', function() {
	gulp.src('./src/assets/*/**')
	.pipe(gulp.dest('./dist/assets'));

});

/**
 * Compile pug files into HTML
 */
gulp.task('templates', function() {
    var YOUR_LOCALS = {
        message: 'This app is powered by gulp.pug recipe for BrowserSync'
    };

    return gulp
        .src('./src/*.pug')
        .pipe(
            pug({
		compileDebug : true,
		pretty : true    
            })
        )
        .pipe(gulp.dest('./dist/'));
});

/**
 * Important!!
 * Separate task for the reaction to `.pug` files
 */
gulp.task('pug-watch', ['templates'], function() {
    return reload();
});


/**
 * Serve and watch the pug files for changes
 */
gulp.task('default', ['templates', 'copy', 'copy-deps', 'copy-vendor-files'], function() {
    browserSync({ server: 
	    './dist',
            'directory' : true
    });

    gulp.watch('./src/*.pug', ['pug-watch']);
});
