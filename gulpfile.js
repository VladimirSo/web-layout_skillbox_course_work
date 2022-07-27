const {
    src,
    dest,
    parallel,
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
const webp = require('gulp-webp');
// const webpHTML = require('gulp-webp-html-fix');
const include = require('gulp-file-include');
const header = require('gulp-header');
const fs = require('fs');

const clean = () => {
    return del([
        'dist',
        'src/styles/sass/**/*.css',
        'src/styles/main/**/*.css'
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

const webpConv = () => {
    return src('src/images/content/*')
    .pipe(webp())
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream())
}

const imgMin = () => {
    const mapOff = (argv.prod) ? false : true;

    return src(['src/images/*', 'src/images/content/*'])
    .pipe(gulpif(argv.prod, imagemin()))
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream())
}

const sassStyles = () => {
    return src('src/sass/**/styles.sass')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(dest('src/styles/sass'))
    .pipe(browserSync.stream())
};

const mainStyles = () => {
    return src('src/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(dest('src/styles/main'))
    .pipe(browserSync.stream())
}

const styles = () => {
    const mapOff = (argv.prod) ? false : true;

    return src('src/styles/sass/**/*.css')
    .pipe(header(fs.readFileSync('src/styles/main/main.css', 'utf8') ))
    .pipe(sourcemaps.init())
    // .pipe(concat('styles.css'))
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
    return src([
        'src/**/*.html',
        '!src/components/page-blocks/**/*.html'
        ])
    // .pipe(webpHTML())
    .pipe(include())
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
            // view: {
            //     view: true, // «view» sprite 
            //     sprite: '../view/stack-sprite.svg'
            // },
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

// const scripts = () => {
//     const mapOff = (argv.prod) ? false : true;

//     return src([
//         'src/js/components/**/*.js',
//         'src/js/main.js'
//         ])
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//         presets: ['@babel/env']
//     }))
//     .pipe(concat('app.js'))
//     .pipe(gulpif(argv.prod, uglify().on('error', notify.onError())))
//     .pipe(gulpif(mapOff, sourcemaps.write('../maps')))
//     .pipe(dest('dist/js'))
//     .pipe(browserSync.stream())
// }

const scripts = () => {
    const mapOff = (argv.prod) ? false : true;

    return src([
        'src/js/components/**/*.js',
        'src/js/main.js',
        '!src/js/modules/**/*.js'
        ])
    .pipe(include())
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // .pipe(concat('app.js'))
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
watch('src/styles/*.css', mainStyles);
watch(['src/styles/main/*.css', 'src/styles/sass/**/*.css'], styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resouces/**', resources);
watch('src/images/content/*', webpConv);
watch('src/images/**/*', imgMin);

exports.clean = clean;
exports.sassStyles = sassStyles;
exports.mainStyles = mainStyles;
exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.imgMin = imgMin;
exports.webpConv = webpConv;

if (argv.prod) {
    // exports.default = series(clean, parallel(resources, favicon), webpConv, imgMin, parallel(htmlMinify, scripts), parallel(sassStyles, mainStyles), styles, svgSprites);
    exports.default = series(clean, parallel(resources, favicon), webpConv, imgMin, parallel(htmlMinify, scripts), parallel(mainStyles, sassStyles), styles, svgSprites);
} else {
    // exports.default = series(clean, parallel(resources, favicon),  webpConv, imgMin, parallel(htmlMinify, scripts), parallel(sassStyles, mainStyles), styles, svgSprites, watchFiles);
    exports.default = series(clean, parallel(resources, favicon),  webpConv, imgMin, parallel(htmlMinify, scripts), parallel( mainStyles, sassStyles), styles, svgSprites, watchFiles);
}
