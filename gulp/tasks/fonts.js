import gulp from 'gulp';
import { PATHS } from '../configs/index.js';

export function fonts () {
  return gulp.src(PATHS['fonts'].src, { encoding: false })
            .pipe(gulp.dest(PATHS['fonts'].dist))
}
