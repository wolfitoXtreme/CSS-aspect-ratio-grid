// versions
    // Sass 3.4.13 (Selective Steve)
    // Compass 1.0.3 (Polaris)

// windows requirements
    // browser-sync ->  Visual Studio 2013 Update 4 (https://www.visualstudio.com/en-us/news/vs2013-update4-rc-vs.aspx)


// dependencies
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    copy = require('gulp-copy'),
    jpegRecompress = require('imagemin-jpeg-recompress'),   
    clean = require('gulp-clean'),
    cache = require('gulp-cache'),
    merge = require('merge-stream'),
    runSequence = require('run-sequence')
;

// project settigs
var project = require('./package.json'),
    projectName = project.name;

// css support ('gulp-autoprefixer')
var cssSupport = '> 3%';



///////////////////////////
//DEVELOPMENT TASKS
///////////////////////////

// compass
gulp.task('compass', function () {
    return gulp.src('src/sass/*.scss')
    
        //compass
        .pipe(compass({
            sass: 'src/sass',
            css: 'src/css',
            image: 'src/img'
        })).on('error', function(error) {
            // Would like to catch the error here 
            console.log(error);
            this.emit('end');
        })

        //autoprefixer
        .pipe(autoprefixer(cssSupport))

        //destination
        .pipe(gulp.dest('src/css'))

        //browserSync
        .pipe(browserSync.reload({
            stream: true
        }))

    ;

});

// file Changes
gulp.task('fileChange', function () {
    return gulp.src([
            'src/*.htm'
        ])
    
        //browserSync
        .pipe(browserSync.reload({
            stream: true
        }))
    ;

});

// concat files

// browserSync
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: ['./src'],
            index: 'index.htm' //need to specify this
        }
    });
});

// watch
gulp.task('watch', ['browserSync', 'compass'], function (){
    gulp.watch([
        'src/*.htm'
    ], ['fileChange']);
    gulp.watch('src/sass/*.scss', ['compass']);
});

// default task
gulp.task('default', function (callback) {
    runSequence(['watch'],
        callback
    );
});


///////////////////////////
// DISTRIBUTION TASKS
///////////////////////////

// clean dist
gulp.task('clean_dist', function () {
    return gulp.src([
            'dist/css/'
        ], {read: false})
        .pipe(clean())
    ;
});


// copy dist
gulp.task('copy_dist', function() {

    var copyHTML = gulp.src([
            'src/*.*',
        ], {base: ''})

        //copy files
        .pipe(gulp.dest('dist/'))
    ;

    var copyIMG = gulp.src([
            'src/img/*.*',
        ], {base: ''})

        //copy files
        .pipe(gulp.dest('dist/img/'))
    ;

    // var copyJS = gulp.src([
    //         'src/js/defaultAssets.js',
    //         'src/js/' + projectName + '.js'
    //     ], {base: ''})

    //     //copy files
    //     .pipe(gulp.dest('dist/js/'))
    // ;

    return merge(copyHTML, copyIMG/*, copyJS*/);

});



// compass dist
gulp.task('compass_dist', function () {
    return gulp.src('src/sass/*.scss')
    
        //compass
        .pipe(compass({
            sass: 'src/sass',
            css: 'dist/css',
            image: 'dist/img',
            style : 'compressed'
        }))
        
        //autoprefixer
        .pipe(autoprefixer(cssSupport))

        //destination
        .pipe(gulp.dest('dist/css'))
    ;

});



// js dist


// clear cache
gulp.task('clearCache', function (done) {
    return cache.clearAll(done);
});

// img dist
gulp.task('imgmin_dist', function() {

    var jpgCompress = gulp.src('src/img/*.jpg')
        .pipe(cache(jpegRecompress({
            max: 85,
            min: 50
        })()))
        .pipe(gulp.dest('dist/img'))
    ;

    // var pngCompress = gulp.src('src/img/*.png')
    //     .pipe(cache(pngquant({
    //         quality: '75-95', 
    //         speed: 5,
    //         // nofs: true,
    //         // floyd: 0.3,
    //         // verbose: true
    //     })()))
    //     .pipe(gulp.dest('dist/img'))
    // ;


    // var svgCompress = gulp.src('src/img/*.svg')
    //     .pipe(cache(svgo()()))
    //     .pipe(gulp.dest('dist/img'))
    // ;

    return merge(jpgCompress/*, pngCompress, svgCompress*/);

});


// dist
gulp.task('dist', function(callback) {
    runSequence(
        'clean_dist',
        'copy_dist',
        'compass_dist',
        // 'jsmin_dist',
        'imgmin_dist', 
        callback
    );
});
