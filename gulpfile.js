const {
    src,
    dest,
    series,
    watch
} = require('gulp');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del')
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');

const clean = () => {
    return del([
        'dist'
        ])
}

const resources = () => {
    return src('src/resources/**')
    .pipe(dest('dist/resources'))
}

const favicon = () => {
    return src('src/favicon/**')
    .pipe(dest('dist/favicon'))
}

const imgMin = () => {
    return src('src/images/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'))
}

const sassStyles = () => {
    const mapOff = (argv.prod) ? false : true;

    return src('src/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(dest('src/styles/sass'));
};

const styles = () => {
    const mapOff = (argv.prod) ? false : true;

    return src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulpif(argv.prod, cleanCSS({
        level: 2
    })))
    .pipe(gulpif(mapOff, sourcemaps.write('../maps')))

    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(gulpif(argv.prod, htmlMin({
        collapseWhitespace: true
    })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
        shape: {
            dimension: {
                maxWidth: 1000,
                maxHeight: 1000
            },
            spacing: {
                // padding: 10
                padding: 0
            },
        },
        mode: {
                //                view: {
                //                    view: true, // «view» sprite
                //                    sprite: '../view/stack-sprite.svg'
                //                },
                stack: {
                    stack: true, // «stack» sprite
                    // sprite: '../stack/stack-sprite.svg'
                    sprite: '../sprite.svg'
                },
                // symbol: {
                //     symbol: true, // «symbol» sprite
                //     inline: false,
                //     sprite: '../sprite.svg'
                // }
            }
        }))
    .pipe(dest('dist/images'))
}

const scripts = () => {
    const mapOff = (argv.prod) ? false : true;

    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulpif(argv.prod, uglify().on('error', notify.onError())))
    .pipe(gulpif(mapOff, sourcemaps.write('../maps')))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

watch('src/**/*.html', htmlMinify);
watch('src/sass/**/*.sass', sassStyles);
watch('src/styles/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resouces/**', resources);
watch('src/images/*', imgMin);

exports.clean = clean;
exports.sassStyles = sassStyles;
exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.imgMin = imgMin;

if (argv.prod) {
    exports.default = series(clean, resources, favicon, imgMin, htmlMinify, scripts, sassStyles, styles, svgSprites);
    // exports.default = series(clean, resources, htmlMinify, scripts, sassStyles, svgSprites);
} else {
    exports.default = series(clean, resources, favicon,imgMin, htmlMinify, scripts, sassStyles, styles, svgSprites, watchFiles);
    // exports.default = series(clean, resources, htmlMinify, scripts, sassStyles, svgSprites, watchFiles);
}
