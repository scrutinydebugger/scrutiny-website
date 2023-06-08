"use strict"

var gulp = require("gulp")
var sass = require("gulp-sass")(require("sass"))
var sourcemaps = require("gulp-sourcemaps")
var fileinclude = require("gulp-file-include")
var autoprefixer = require("gulp-autoprefixer")
var rimraf = require("rimraf")

var path = {
    src: {
        html: "source/pages/**/*.html",
        others: "source/*.+(php|ico|png)",
        htminc: "source/partials/**/*.htm",
        incdir: "source/partials/",
        plugins: "source/plugins/**/*.*",
        js: "source/js/*.js",
        scss: "source/scss/**/*.scss",
        images: "source/images/**/*.+(png|jpg|gif|svg)",
    },
    build: {
        dirDev: "dist/",
    },
}

// HTML
gulp.task("html:build", function () {
    return gulp
        .src(path.src.html)
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

// Watch Task
gulp.task("watch", function () {
    gulp.watch(path.src.html, gulp.series("html:build"))
    gulp.watch(path.src.htminc, gulp.series("html:build"))
    gulp.watch(path.src.scss, gulp.series("scss:build"))
    gulp.watch(path.src.js, gulp.series("js:build"))
    gulp.watch(path.src.images, gulp.series("images:build"))
    gulp.watch(path.src.plugins, gulp.series("plugins:build"))
})

// Build Task
gulp.task("build", gulp.series("clean", "html:build", "js:build", "scss:build", "images:build", "plugins:build", "others:build"))
gulp.task("default", gulp.series("build"))
