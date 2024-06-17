import gulp from 'gulp';
// HTMLmin - Minify HTML
import htmlmin from 'gulp-htmlmin';
import { PATHS } from '../configs/index.js';

export default function html () {
  return gulp.src(PATHS['html'].src)
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest(PATHS['html'].dist))
}
