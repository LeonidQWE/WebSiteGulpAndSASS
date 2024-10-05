import gulp from 'gulp';
import browserSync from 'browser-sync';
import {
  cleanAll,
  styles,
  images,
  scripts,
  html,
  reload,
  fonts
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
  watch(PATHS['images'].src, series(images, reload))
  watch(PATHS['scripts'].src, series(scripts, reload))
  watch(PATHS['html'].src, series(html, reload))
  watch(PATHS['fonts'].src, series(fonts, reload))
}

const development = series(cleanAll, parallel(html, styles, scripts), fonts, images, devServer)
development.displayName = 'dev'
export { development }
