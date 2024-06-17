import browserSync from 'browser-sync';

export default function reload (done) {
    browserSync.reload();
    done()
}
