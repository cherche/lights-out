const gulp = require('gulp')

const concatCss = require('gulp-concat-css')
const cleanCSS = require('gulp-clean-css')

const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const minify = require('gulp-babel-minify')

gulp.task('css', () => {
  return gulp.src('src/css/style.css')
    .pipe(concatCss('bundle.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/'))
})

gulp.task('js', () => {
  return gulp.src('src/index.js')
    .pipe(webpack({
      output: { filename: 'bundle.js' }
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify())
    .pipe(gulp.dest('dist/'))
});

gulp.task('build', ['css', 'js'])
