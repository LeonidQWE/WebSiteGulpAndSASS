import gulp from 'gulp';
// Removes files and folders.
import clean from 'gulp-clean';
//Del - Plugin for quickly deleting directories or files
import { deleteAsync } from 'del';
import { PATHS } from '../configs/paths.js';

export function cleanAll () {
  return deleteAsync(['dist/*']);
}

export function cleanImages () {
  return gulp.src(PATHS['images'].dist)
            .pipe(clean({read: false}));
}

