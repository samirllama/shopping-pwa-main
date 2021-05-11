/* eslint-disable no-console */
const eventStream = require('event-stream');
const gulp = require('gulp');
const s3 = require('./tasks/gulp-s3');
const bundleSizePublisher = require('./tasks/publish-bundle-size');
const gzip = require('gulp-gzip');

const { cdn } = require('bernie-config').config;

gulp.task('upload', async () => {
  const dist = gulp
    .src([
      'public/**/*.*',
      'static/**/*.{js,css}?(.map)',
      'static/**/service-worker-manifest.*.json',
      'static/**/sass-manifest.*.json',
      'node_modules/shopping-pwa-localization/dist/*/*.js?(.map)'
    ])
    .pipe(gzip())
    .pipe(gulp.dest('dist/'));

  const knoxConfig = {
    bucket: cdn.aws.bucket,
    region: cdn.aws.region
  };

  const s3upload = await s3(knoxConfig, {
    gzippedOnly: true,
    uploadPath: 'shopping-pwa',
    headers: {
      'Cache-Control': 'max-age=2592000, public'
    },
    failOnError: true
  });

  const s3uploadEvents = dist.pipe(s3upload);
  const bundlePublisher = dist.on('end', () => bundleSizePublisher());

  return eventStream.merge(s3uploadEvents, bundlePublisher);
});

gulp.task('default', () => {
  throw new Error('\n\n\nGulp will soon be removed, please use "yarn dev"\n\n\n');
});
