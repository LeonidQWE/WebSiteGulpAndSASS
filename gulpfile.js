//----------------------------
// Connect plugins with Gulp
//----------------------------
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
//CleanCSS - performs code minification CSS
const cleanCSS = require('gulp-clean-css')
//Rename - Allows you to rename a file, add prefixes or suffixes
const rename = require('gulp-rename')
//Del - Plugin for quickly deleting directories or files
const del = require('del');
// Babel
const babel = require('gulp-babel')
// Concat - in order to combine several JavaScript files into one
const concat = require('gulp-concat')
// Uglify - Allows you to minify code and optimize it
const uglify = require('gulp-uglify')

const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/css/',
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/',
  }
}

//----------------------------
// Tasks
//----------------------------
function clean () {
  return del(['dist'])
}

// Styling processing
function styles () {
  return gulp.src(paths.styles.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(cleanCSS())
            .pipe(rename({
              basename: 'style',
              suffix: '.min'
            }))
            .pipe(gulp.dest(paths.styles.dest))
}

// Scripting processing
function scripts () {
  return gulp.src(paths.scripts.src)
            .pipe(babel())
            .pipe(uglify())
            .pipe(concat('script.min.js'))
            .pipe(gulp.dest(paths.scripts.dest))
}

// File change tracking
function watch () {
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
}

// There are two functions: series() and parallel(). They are designed to perform any number of tasks in different modes. series() allows you to perform tasks sequentially, and parallel() in parallel
const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

//----------------------------
// Exports
//----------------------------
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
// This command will work if you simply write “gulp” in the command line
exports.default = build;
