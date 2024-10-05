import gulp from 'gulp';
// webp - Allows you to convert images to webp
import webp from 'gulp-webp';
// newer - Allows you to track code in development files
import newer from 'gulp-newer';

import { PATHS } from '../configs/index.js';

export default function webpImages() {
  return gulp.src(PATHS['images'].src, { encoding: false})
            .pipe(newer(PATHS['images'].dist))
            .pipe(webp())
            .pipe(gulp.dest(PATHS['images'].dist))
}
