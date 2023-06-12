"use strict"

const gulp = require("gulp")
const replace = require("gulp-replace")
const sass = require("gulp-sass")(require("sass"))
const sourcemaps = require("gulp-sourcemaps")
const fileinclude = require("gulp-file-include")
const autoprefixer = require("gulp-autoprefixer")
const rimraf = require("rimraf")

const path = {
    src: {
        html: "source/pages/**/*.html",
        others: "source/*.+(php|ico|png)",
        htminc: "source/partials/**/*.htm",
        incdir: "source/partials/",
        plugins: "source/plugins/**/*.*",
        js: "source/js/*.js",
        scss: "source/scss/**/*.scss",
        images: "source/images/**/*.+(png|jpg|gif|svg)",
        videos: "source/videos/**/*.+(mp4|ogg|avi|mkv)",
    },
    build: {
        dirDev: "dist/",
    },
}

// HTML
gulp.task("html:build", function () {
    return gulp
        .src(path.src.html)
        .pipe(replace(/<!--\s*prettier-ignore\s*-->\r?\n?/g, ""))
        .pipe(
            fileinclude({
                basepath: path.src.incdir,
            })
        )
        .pipe(gulp.dest(path.build.dirDev))
})

// SCSS
gulp.task("scss:build", function () {
    return gulp
        .src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("/"))
        .pipe(gulp.dest(path.build.dirDev + "css/"))
})

// Javascript
gulp.task("js:build", function () {
    return gulp.src(path.src.js).pipe(gulp.dest(path.build.dirDev + "js/"))
})

// Images
gulp.task("images:build", function () {
    return gulp.src(path.src.images).pipe(gulp.dest(path.build.dirDev + "images/"))
})

// Videos
gulp.task("videos:build", function () {
    return gulp.src(path.src.videos).pipe(gulp.dest(path.build.dirDev + "videos/"))
})

// Plugins
gulp.task("plugins:build", function () {
    return gulp.src(path.src.plugins).pipe(gulp.dest(path.build.dirDev + "plugins/"))
})

// Other files like favicon, php, sourcele-icon on root directory
gulp.task("others:build", function () {
    return gulp.src(path.src.others).pipe(gulp.dest(path.build.dirDev))
})

// Clean Build Folder
gulp.task("clean", function (cb) {
    rimraf(path.build.dirDev, cb)
})

// Build Task
gulp.task(
    "build",
    gulp.series("clean", "html:build", "js:build", "scss:build", "images:build", "videos:build", "plugins:build", "others:build")
)
gulp.task("default", gulp.series("build"))
