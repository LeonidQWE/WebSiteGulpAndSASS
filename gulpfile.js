//----------------------------
// Connect plugins with Gulp
//----------------------------
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
//CleanCSS - performs code minification CSS
const cleanCSS = require('gulp-clean-css')
//Rename - Allows you to rename a file, add prefixes or suffixes
const rename = require('gulp-rename')
// Babel
const babel = require('gulp-babel')
// Concat - in order to combine several JavaScript files into one
const concat = require('gulp-concat')
// Uglify - Allows you to minify code and optimize it
const uglify = require('gulp-uglify')
// Sourcemaps - Allows you to track code in development files
const sourcemaps = require('gulp-sourcemaps')
// Autoprefixer - Adds prefixes for styles to work correctly in different browsers (Version 9.0.0 does not work correctly)
const autoprefixer = require('gulp-autoprefixer')
// HTMLmin - Minify HTML
const htmlmin = require('gulp-htmlmin');
// Imagecomp - Minify PNG, JPEG, GIF and SVG images
const imagecomp = require("compress-images");
//
const browsersync = require('browser-sync').create()
//Del - Plugin for quickly deleting directories or files
const del = require('del');

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/styles/scss/**/*.scss',
    dest: 'dist/css/',
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/',
  },
  images: {
    src: 'src/images/*',
    dest: 'dist/images/'
  },
}

//----------------------------
// Tasks
//----------------------------
function clean () {
  return del(['dist/*'])
}

function cleanImg () {
  return del(['dist/images/*'])
}

// HTML processing
function html () {
  return gulp.src('src/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('dist'))
            .pipe(browsersync.stream());
}

// Styling processing
function styles () {
  return gulp.src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
              cascade: false
            }))
            .pipe(cleanCSS({
              level: 2,
            }))
            .pipe(rename({
              basename: 'style',
              suffix: '.min'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browsersync.stream());
}

// Scripting processing
function scripts () {
  return gulp.src(paths.scripts.src, { sourcemaps: true,})
            .pipe(sourcemaps.init())
            .pipe(babel({
              presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(concat('script.min.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.scripts.dest))
            .pipe(browsersync.stream());
}

async function img () {
  imagecomp(
    // take all the images from the source folder
    paths.images.src,
    // upload optimized images to the destination folder
    paths.images.dest,
    // configure basic parameters
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    // compress and optimize images
    { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
    { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    function () {
      imagecomp(
        paths.images.src,
        paths.images.dest,
        { compress_force: false, statistic: true, autoupdate: false },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
        { png: { engine: false, command: false } },
        { svg: { engine: false, command: false } },
        { gif: { engine: false, command: false } },
        function () {}
      );
    }
  );
}

// File change tracking
function watch () {
  browsersync.init({
    server: {
      baseDir: './dist/'
    },
  })
  gulp.watch(paths.html.dest).on('change', browsersync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, gulp.series(cleanImg, img))
}

// There are two functions: series() and parallel(). They are designed to perform any number of tasks in different modes. series() allows you to perform tasks sequentially, and parallel() in parallel
const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch)

//----------------------------
// Exports
//----------------------------
exports.clean = clean;
exports.img = img;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
// This command will work if you simply write “gulp” in the command line
exports.default = build;
