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
    serverFactory = require('spa-server'),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'server/public/',
        js: 'server/public/javascripts/',
        css: 'server/public/stylesheets/',
        img: 'server/public/images/',
        fonts: 'server/public/fonts/',
        json: 'server/public/ajax/'
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

gulp.task('webserver', () => {
    var server = serverFactory.create({
        path: './server/public',
        port: 8888,
        fallback: '/index.html'
    });

    server.start();
});

gulp.task('sass', () => {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
});

gulp.task("js", () => {
    gulp.src(path.src.js)
        .pipe(rjs({
            baseUrl:'front/javascripts/',
            outPath: path.build.js,
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

gulp.task("js_copy", () => {
    gulp.src(path.src.js_copy)
        .pipe(gulp.dest(path.build.js))
});

gulp.task("json", () => {
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json))
});

gulp.task('image',() => {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task("fonts", () => {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
    gulp.src('front/fonts/**/*.*')
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('html',() => {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(include())//Объединим с шаблонами
        .pipe(htmlmin({collapseWhitespace: true}))//минимизируем
        .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
});

gulp.task('watch', function(){
    watch([path.watch.html], () => {
        gulp.start('html');
    });
    watch([path.watch.style], () => {
        gulp.start('sass');
    });
    watch([path.watch.js], () => {
        gulp.start('js');
    });
    watch([path.watch.img], () => {
        gulp.start('image');
    });
    watch([path.watch.fonts], () => {
        gulp.start('fonts');
    });
    watch([path.watch['json']], () => {
        gulp.start('json');
    });
});

gulp.task('start',(cb) => {
    runSequence(['fonts', 'js', 'js_copy', 'sass', 'image', 'html', 'json'], cb);
});

gulp.task('default',(cb) => {
    runSequence(['start','webserver','watch'], cb);
});
