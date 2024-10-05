import gulp from 'gulp';
import browserSync from 'browser-sync';
import {
  cleanAll,
  styles,
  minImages,
  webpImages,
  scripts,
  html,
  reload
} from './gulp/tasks/index.js';
import { PATHS } from './gulp/configs/index.js';

const { series, parallel, watch} = gulp;

function devServer () {
  browserSync.init({
    server: {
      baseDir: PATHS['main']
    },
  })

  watch(PATHS['html'].dist).on('change', browserSync.reload)
  watch(PATHS['styles'].src, series(styles, reload))
  watch(PATHS['images'].src, series(webpImages, minImages, reload))
  watch(PATHS['scripts'].src, series(scripts, reload))
  watch(PATHS['html'].src, series(html, reload))
}

const development = series(cleanAll, parallel(html, styles, scripts), webpImages, minImages, devServer)
development.displayName = 'dev'
export { development }
