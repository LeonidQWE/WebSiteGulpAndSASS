import gulp from 'gulp';
// Imagecomp - Minify PNG, JPEG, GIF and SVG images
import compressImages from 'compress-images';
import { PATHS } from '../configs/index.js';

export default async function images() {
  try {
    compressImages(
      // take all the images from the source folder
      PATHS['images'].src,
      // upload optimized images to the destination folder
      PATHS['images'].dist,
      // configure basic parameters
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      // compress and optimize images
      { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
      { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
      function (error, completed, statistic) {
      }
    )
  } catch (error) {
      console.log(error);
  }
}

