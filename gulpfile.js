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
    rigger = require('gulp-rigger'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'public/',
        js: 'public/javascripts/',
        bower_js: 'public/bower_components/',
        css: 'public/stylesheets/',
        img: 'public/images/',
        fonts: 'public/fonts/',
        json: 'public/ajax/'
    },
    src: { //Пути откуда брать исходники
        html: 'front/**/*.html',
        js: 'front/javascripts/**/*.*',
        bower_js: 'front/bower_components/**/*.js',
        style: 'front/stylesheets/main.scss',
        img: 'front/images/**/*.*',
        fonts: 'front/bower_components/bootstrap-sass/assets/fonts/**/*.*',
        json: 'front/ajax/**/*.json'
    },
    watch:{
        html: 'front/**/*.html',
        js: 'front/javascripts/**/*.js',
        bower_components: 'front/bower_components/**/*.js',
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
        .pipe(gulp.dest(path.build.js))
});

gulp.task("bower_js", function () {
    gulp.src(path.src.bower_js)
        .pipe(gulp.dest(path.build.bower_js))
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
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('sass');
    });
    watch([path.watch.bower_components], function(event, cb) {
        gulp.start('bower_components');
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

gulp.task('default', function(cb) {
    runSequence(['fonts', 'js', 'bower_js', 'sass', 'image', 'html', 'json','watch'], cb);
});