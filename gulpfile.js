const gulp = require('gulp')

const run = require('gulp-run')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const minify = require('gulp-babel-minify')

gulp.task('messages', () => {
  return run('node src/data/processor.js').exec()
    .pipe(rename('messages.js'))
    .pipe(gulp.dest('src/data'))
})

gulp.task('css', () => {
  return gulp.src(['src/css/main.css', 'src/css/win-messages.css', 'src/css/mobile.css'])
    .pipe(concat('bundle.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/'))
})

const watcher = gulp.watch('src/css/*.css', ['css'])
watcher.on('change', (event) => {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
})

gulp.task('js', ['messages'], () => {
  return gulp.src('src/index.js')
    .pipe(webpack({
      // watch: true,
      output: { filename: 'bundle.js' }
    }))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(minify())
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['css', 'js'])
