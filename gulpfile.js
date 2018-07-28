const gulp = require('gulp')

const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const source = require('vinyl-source-stream')
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const minify = require('gulp-babel-minify')

gulp.task('css', () => {
  return gulp.src(['src/css/main.css', 'src/css/win-messages.css', 'src/css/mobile.css'])
    .pipe(concat('bundle.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/'))
})

/*
const watcher = gulp.watch('src/css/*.css', ['css'])
watcher.on('change', (event) => {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
})
*/

function buildMessages (messages) {
  const winMessages = []

  for (const type of Object.keys(messages)) {
    const vals = [].slice.apply(messages[type])

    vals.forEach((text) =>
      winMessages.push(`  {
    type: '${type}',
    text: '${text.replace(/'/g, '\\\'')}'
  }`))
  }

  const data =
`const winMessages = [
${winMessages.join(',\n')}
]

export default winMessages
`

  return data
}

gulp.task('messages', () => {
  const messages = require('./src/data/messages.json')

  const stream = source('messages.js')
  stream.end(buildMessages(messages))

  return stream
    .pipe(gulp.dest('./src/data/'))
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
