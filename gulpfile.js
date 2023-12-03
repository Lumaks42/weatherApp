const {src, dest, watch, parallel, series} = require('gulp');

// install sass
const sass          = require('gulp-sass')(require('sass'));
const sourcemaps    = require('gulp-sourcemaps');
// конкотынация файлов scss
const concat        = require('gulp-concat');
// конкотынация файлов js6 
const uglifyWatch   = require('gulp-uglify-es').default;
// автоматическое обновление сайта
const browserSync   = require('browser-sync').create();
// для удаления старого dist перед сборкой нового
const clean         = require('gulp-clean'); 

// функция для соединения скриптов и минифицированя JS
function scripts() {
    return src(['app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglifyWatch())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
} 

// функция для конвертации .sass -> .css
function styles() {
    return src('app/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed',
    })).on("error", sass.logError)
    .pipe(sourcemaps.write("."))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());

}

// отслеживания изминений и отрисовка 
// в файлы (.css, min.js)
function gatekeeper() {
    watch(['app/sass/style.sass'], styles)
    watch(['app/js/main.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload);
}

function browserLaunch() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function deleteDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'app/css/*.css',
        'app/js/main.min.js',
        'app/**/*.html'
    ], {base : 'app'})
        .pipe(dest('dist'))
}



// экспорт функций
exports.styles = styles;
exports.scripts = scripts;
exports.gatekeeper = gatekeeper;
exports.browserLaunch = browserLaunch;

exports.build = series(deleteDist, building);
exports.default = parallel(styles, scripts, browserLaunch, gatekeeper);
