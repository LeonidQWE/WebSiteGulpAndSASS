import gulp from 'gulp';
import { PATHS } from '../configs/index.js';

export function fonts () {
  return gulp.src(PATHS['fonts'].src)
            .pipe(gulp.dest(PATHS['fonts'].dist))
}
