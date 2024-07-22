const gulp = require('gulp'),
    babel = require('gulp-babel'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    // concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    // concatCss = require('gulp-concat-css'),
    sourceMaps = require('gulp-sourcemaps'),
    sync = require('browser-sync'),
    nunjucks = require('gulp-nunjucks'),
    data = require('gulp-data')
reload = sync.reload;

// html task
const html = () => {
  return gulp.src('app/html/*.+(html|njk|twig)')
      .pipe(data(function() {
        return require('./app/html/data/data.json')
      }))
      .pipe(nunjucks.compile())
      .pipe(gulp.dest('./html'))
      .pipe(reload({stream: true}));
}

exports.html = html;

// Styles

const style = () => {
  return gulp.src('app/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sourceMaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(prefix('last 10 versions'))
      .pipe(sourceMaps.write('/'))
      .pipe(gulp.dest('html/css/'))
};
exports.style = style;

const styleMin = () => {
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(prefix('last 10 versions'))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourceMaps.write('/'))
        .pipe(gulp.dest('html/css/'))
        .pipe(reload({stream: true}));
};
exports.styleMin = styleMin;


// Styles libs

const styleLibs = () => {
  return gulp.src(
      [
        './node_modules/swiper/swiper-bundle.min.css',
      ]
  )
      .pipe(cleanCSS())
      .pipe(gulp.dest('html/css/vendors/'));
};
exports.styleLibs = styleLibs;


// Scripts

const js = () => {
    return gulp.src('app/js/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('html/js/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('html/js/'))
        .pipe(reload({stream: true}));
};

exports.js = js;

// Scripts libs
const jsLibs = () => {
  return gulp.src(
      [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/swiper/swiper-bundle.min.js'
      ]
  )
      .pipe(gulp.dest('html/js/'));
};

exports.jsLibs = jsLibs;

// Copy

const copy = () => {
  return gulp.src([
    'app/fonts/**/*',
    'app/images/**/*',
    'app/sass/**/*',
    'app/i/**/*',
  ], {
    base: 'app'
  })
      .pipe(gulp.dest('html'))
      .pipe(sync.stream({
        once: true
      }));
};

exports.copy = copy;


// Server

const server = () => {
  let files = [
    'app/sass/**/*.scss'
  ]
  sync.init(files,{
    ui: false,
    notify: false,
    server: {
      baseDir: 'html'
    }
  });
};

exports.server = server;

// Watch
const watch = () => {
  gulp.watch('app/html/**/*.+(html|njk|twig)', gulp.series(html));
  gulp.watch('app/sass/**/*.scss', gulp.series(style, styleMin));
  gulp.watch('app/js/**/*.js', gulp.series(js));
  gulp.watch([
    'app/fonts/**/*',
    'app/images/**/*',
  ], gulp.series(copy));
};

exports.watch = watch;

// Default

exports.default = gulp.series(
    gulp.parallel(
        html,
        style,
        styleMin,
        js,
        styleLibs,
        jsLibs,
        copy,
    ),
    gulp.parallel(
        watch,
        server,
    ),
);