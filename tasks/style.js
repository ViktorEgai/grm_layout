const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const bulk = require('gulp-sass-bulk-importer');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const bs = require('browser-sync');
const rename = require('gulp-rename');

module.exports = function style() {
    // Сборка основного файла style.sass со всеми импортами
    src('src/sass/style.sass')
        .pipe(map.init())
        .pipe(bulk())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(prefixer({
            overrideBrowserslist: ['last 8 versions'],
            browsers: [
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 11',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6',
            ],
        }))
        .pipe(clean({
            level: 2
        }))
        .pipe(concat('style.min.css'))
        .pipe(map.write('../sourcemaps/'))
        .pipe(dest('build/css/'))
        .pipe(dest('theme/css/'))
        .pipe(bs.stream());

    // Сборка отдельных файлов (исключая style.sass и файлы с _)
    return src([
            'src/sass/**/*.sass',
            'src/sass/**/*.scss',
            '!src/sass/style.sass',
            '!src/sass/**/_*.sass',
            '!src/sass/**/_*.scss',
            '!src/sass/**/_*/*.sass', // исключаем partials в подпапках
            '!src/sass/**/_*/*.scss'  // исключаем partials в подпапках
        ])
        .pipe(map.init())
        .pipe(bulk())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(prefixer({
            overrideBrowserslist: ['last 8 versions'],
            browsers: [
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 11',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6',
            ],
        }))
        .pipe(clean({
            level: 2
        }))
        .pipe(rename({ suffix: '.min' })) // добавляем .min к имени файла
        .pipe(map.write('../sourcemaps/'))
        .pipe(dest('build/css/'))
        .pipe(dest('theme/css/'))
        .pipe(bs.stream());
}