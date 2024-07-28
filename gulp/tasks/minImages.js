import gulp from 'gulp';
// Imagecomp - Minify PNG, JPEG, GIF and SVG images
// import compressImages from 'compress-images';
// imagemin - Minify PNG, JPEG, GIF and SVG images
import imagemin from 'gulp-imagemin';
// newer - Allows you to track code in development files
import newer from 'gulp-newer';

import { PATHS } from '../configs/index.js';

export default function minImages() {
  return gulp.src(PATHS['images'].src, { encoding: false})
        .pipe(newer(PATHS['images'].dist))
        .pipe(imagemin())
        .pipe(gulp.dest(PATHS['images'].dist))
}

// export default async function images() {
//   try {
//     compressImages(
//       // take all the images from the source folder
//       PATHS['images'].src,
//       // upload optimized images to the destination folder
//       PATHS['images'].dist,
//       // configure basic parameters
//       { compress_force: false, statistic: true, autoupdate: true },
//       false,
//       // compress and optimize images
//       { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
//       { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
//       { svg: { engine: "svgo", command: "--multipass" } },
//       { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
//       function (error, completed, statistic) {
//       }
//     )
//   } catch (error) {
//     console.log(error)
//   }
// }

