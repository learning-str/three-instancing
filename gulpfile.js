//
//  Takram Confidential
//
//  Copyright (C) 2017-Present Satoru Osawa
//
//  All information contained herein is, and remains the property of Takram.
//  The intellectual and technical concepts contained herein are proprietary to
//  Takram and may be covered by Japan and Foreign Patents, patents in process,
//  and are protected by trade secret or copyright law. Dissemination of this
//  information or reproduction of this material is strictly forbidden unless
//  prior written permission is obtained from Takram. Access to the source code
//  contained herein is hereby forbidden to anyone except current Takram
//  employees, managers or contractors who have executed Confidentiality and
//  Non-disclosure agreements explicitly covering such access.
//
//  The copyright notice above does not evidence any actual or intended
//  publication or disclosure of this source code, which includes information
//  that is confidential and/or proprietary, and is a trade secret, of Takram.
//  Any reproduction, modification, distribution, public performance, or public
//  display of or through use of this source code without the express written
//  consent of Takram is strictly prohibited, and in violation of applicable
//  laws and international treaties. The receipt or possession of this source
//  code and/or related information does not convey or imply any rights to
//  reproduce, disclose or distribute its contents, or to manufacture, use, or
//  sell anything that it may describe, in whole or in part.
//

/* eslint-disable no-console */

const browserSync = require('browser-sync').create()
const buffer = require('vinyl-buffer')
const changed = require('gulp-changed')
const cssnext = require('postcss-cssnext')
const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const poststylus = require('poststylus')
const rollup = require('rollup-stream')
const sequence = require('gulp-sequence')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const stylus = require('gulp-stylus')

// BrowserSync

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './build',
    port: 5000,
    notify: false,
    // browser: 'google chrome',
  })
})

// Build

gulp.task('build:html', () => {
  return gulp.src([
    './src/index.html',
  ])
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true,
  }))
  .pipe(gulp.dest('./build'))
  .pipe(browserSync.stream())
})

gulp.task('build:js', () => {
  return rollup('rollup.config.js')
  .on('error', function error(error) {
    console.error(error.stack)
    this.emit('end')
  })
  .pipe(source('main.js', './src/js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('.', {
    mapSources: source => {
      return `/src/js/${source}`
    },
  }))
  .pipe(gulp.dest('./build/js'))
})

gulp.task('build:js-watch', ['build:js'], callback => {
  browserSync.reload()
  callback()
})

gulp.task('build:css', () => {
  return gulp.src([
    './src/css/main.styl',
  ])
  .pipe(sourcemaps.init())
  .pipe(stylus({
    use: [
      poststylus([cssnext()]),
    ],
  })
  .on('error', function error(error) {
    console.error(error.stack)
    this.emit('end')
  }))
  .pipe(sourcemaps.write('.', {
    mapSources: source => {
      return `/src/${source}`
    },
  }))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream({ match: '**/*.css' }))
})

gulp.task('build:asset', () => {
  return gulp.src([
    './src/asset/**/*',
  ])
  .pipe(changed('./build/asset'))
  .pipe(gulp.dest('./build/asset'))
  .pipe(browserSync.stream())
})

// Clean

gulp.task('clean', () => {
  return del(['./build/*', '!./build/data', '!./build/jslib'])
})

// gulp.task('clean:map', () => {
//   return del('./build/**/*.map')
// })

// Watch

gulp.task('watch', () => {
  gulp.watch('./src/*.html', ['build:html'])
  gulp.watch('./src/js/**/*', ['build:js-watch'])
  gulp.watch('./src/css/**/*', ['build:css'])
  gulp.watch('./src/asset/**/*', ['build:asset'])
})

// Tasks

gulp.task('build', sequence(...[
  'clean',
  [
    'build:html',
    'build:js',
    'build:css',
    'build:asset',
  ],
]))

gulp.task('start', sequence(...[
  'build',
  'browser-sync',
  'watch',
]))
