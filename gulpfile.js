const {src, dest, series, parallel, watch} = require("gulp")
const browserSync = require("browser-sync").create()
const sass = require("gulp-sass")(require("sass"))
const concat = require("gulp-concat")
const html = require("gulp-file-include")
const babel = require("gulp-babel")
const uglify = require("gulp-uglify-es").default
const autoprefixer = require("gulp-autoprefixer")

const page = () => {
  return src("./src/pages/**.html")
    .pipe(html())
    .pipe(dest("./dest/"))
    .pipe(browserSync.stream())
}

const styles = () => {
  return src( "./src/styles/**/*.scss")
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserslist: ["last 10 version"]
  }))
  .pipe(dest("./dest/styles/"))
  .pipe(browserSync.stream())
}

const watcher = () => {
  watch("./src/styles/**/*.scss", styles)
  watch("./src/pages/**/*.html", page)
  watch("./src/scripts/**/*.js", scripts)
}

const scripts = () => {
  return src("./src/scripts/**/*.js")
  .pipe(babel())
  .pipe(concat("main.min.js"))
  .pipe(uglify())
  .pipe(dest("./dest/scripts/"))
  .pipe(browserSync.stream())
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: './dest/',
      online: true
    }
  })
}

// exports.watcher = watcher
// exports.page = page
// exports.styles = styles
exports.default = series(styles, scripts ,page, parallel(server, watcher))
