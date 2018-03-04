const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');
const server = require('browser-sync').create();

const postCCSPlugins = [
  cssnano({
    core: false,
    autoprefixer: {
      add: true,
      browsers: 'last 2 versions'
    }
  })
];

gulp.task('pug', () => {
  gulp.src('./dev/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public'));
});

gulp.task('sass', () => {
  gulp.src('./dev/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(postCCSPlugins))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public/css'))
    .pipe(server.reload({ stream: true }));
});

gulp.task('default', ['pug', 'sass'], () => {
  server.init({ server: './public' });
})

gulp.watch('./dev/pug/**/*.pug', ['pug', server.reload]);
gulp.watch('./dev/scss/**/*.scss', ['sass']);