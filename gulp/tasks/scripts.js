import gulp from 'gulp';
// Babel - for older browsers
import babel from 'gulp-babel';
// Uglify - Allows you to minify code and optimize it
import uglify from 'gulp-uglify';
// Concat - in order to combine several JavaScript files into one
import concat from 'gulp-concat';
// Sourcemaps - Allows you to track code in development files
import sourcemaps from 'gulp-sourcemaps';
import { PATHS } from '../configs/index.js';

export default function scripts () {
  return gulp.src(PATHS['scripts'].src, { sourcemaps: true,})
            .pipe(sourcemaps.init())
            .pipe(babel({presets: ['@babel/env']}))
            .pipe(uglify())
            .pipe(concat('script.min.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(PATHS['scripts'].dist))
}

