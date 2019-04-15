const gulp = require('gulp'),
    rename       = require('gulp-rename'),       // для переименования файлов
    imagemin     = require('gulp-imagemin'),     // для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // для работы с png
    cache        = require('gulp-cache'),        // библиотека кеширования
    autoprefixer = require('gulp-autoprefixer'), // для автоматического добавления префиксов
    minifyCSS    = require('gulp-minify-css');   // минификация сыы;

gulp.task('build:css', () => {
    return gulp.src('src/css/index.css') // Берем источник
        .pipe(minifyCSS({processImport: true}))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 9'], { cascade: true }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('copy:img', ()=> {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))/**/)
        .pipe(gulp.dest('build/img'));
});

gulp.task('copy:fonts', ()=> {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('default', gulp.series([
    'copy:img',
    'copy:fonts',
    'build:css'
]));