'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    runSequence = require('run-sequence'),
    include = require("gulp-include"),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require("browser-sync"),
    rjs = require('./r'),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'public/',
        js: 'public/javascripts/',
        css: 'public/stylesheets/',
        img: 'public/images/',
        fonts: 'public/fonts/',
        json: 'public/ajax/'
    },
    src: { //Пути откуда брать исходники
        html: ['front/**/*.html','!front/templates/**/_*.html','!front/bower_components/**/*.*'],
        js: 'front/javascripts/bootstrap.js',
        js_copy: ['front/bower_components/requirejs/require.js','front/javascripts/main.js'],
        style: 'front/stylesheets/main.scss',
        img: 'front/images/**/*.*',
        fonts: 'front/bower_components/bootstrap-sass/assets/fonts/**/*.*',
        json: 'front/ajax/**/*.json'
    },
    watch:{
        html: 'front/**/*.html',
        js: 'front/javascripts/**/*.js',
        style: 'front/stylesheets/**/*.scss',
        img: 'front/images/**/*.*',
        fonts: 'front/fonts/**/*.*',
        json: 'front/ajax/**/*.json'
    }
};

gulp.task('sass', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
});

gulp.task("js", function () {
    gulp.src(path.src.js)
        .pipe(rjs({
            baseUrl:'front/javascripts/',
            outPath:'public/javascripts/',
            paths: {
                'domReady': '../bower_components/domReady/domReady',
                'angular': '../bower_components/angular/angular.min',
                'uiRouter': '../bower_components/angular-ui-router/release/angular-ui-router.min',
                'jquery': '../bower_components/jquery/dist/jquery.min',
                'bstrap': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap.min',
                'slimScroll': '../bower_components/jquery-slimscroll/jquery.slimscroll.min'
            },
            // angular не поддерживает AMD из коробки, поэтому экспортируем перменную angular в глобальную область
            shim: {
                'angular': {
                    deps: [],
                    exports: 'angular'
                },
                'uiRouter':{
                    deps: ['angular']
                },
                "bstrap" : {
                    "deps" :['jquery']
                },
                "slimScroll" : {
                    "deps" :['jquery']
                }
            }
        }))
});

gulp.task("js_copy", function () {
    gulp.src(path.src.js_copy)
        .pipe(gulp.dest(path.build.js))
});

gulp.task("json", function () {
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json))
});

gulp.task('image', function() {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task("fonts", function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
    gulp.src('front/fonts/**/*.*')
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('html', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(include())//Объединим с шаблонами
        .pipe(htmlmin({collapseWhitespace: true}))//минимизируем
        .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('sass');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
    watch([path.watch['json']], function(event, cb) {
        gulp.start('json');
    });
});

gulp.task('start', function(cb) {
    runSequence(['fonts', 'js', 'js_copy', 'sass', 'image', 'html', 'json'], cb);
});
gulp.task('default', function(cb) {
    runSequence(['start','watch'], cb);
});