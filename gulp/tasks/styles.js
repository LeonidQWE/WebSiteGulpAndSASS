import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
//Rename - Allows you to rename a file, add prefixes or suffixes
import rename from 'gulp-rename';
// Autoprefixer - Adds prefixes for styles to work correctly in different browsers (Version 9.0.0 does not work correctly)
import autoprefixer from 'gulp-autoprefixer';
//CleanCSS - performs code minification CSS
import cleanCSS from 'gulp-clean-css';
// Sourcemaps - Allows you to track code in development files
import sourcemaps from 'gulp-sourcemaps';
import { PATHS } from '../configs/paths.js';

const sass = gulpSass(dartSass);

export default function styles () {
  return gulp.src(PATHS['styles'].src)
            .pipe(sourcemaps.init())
            .pipe(sass.sync().on('error', sass.logError))
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
            .pipe(gulp.dest(PATHS['styles'].dist))
}
