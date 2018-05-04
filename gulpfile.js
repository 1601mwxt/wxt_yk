var gulp = require('gulp');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-webserver');
var sequence = require('gulp-sequence');
var minCss = require('gulp-clean-css');
var data = require('./src/data/data.json')
gulp.task('minCss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('src/css'))
})
gulp.task('server', ['minCss'], function() {
    gulp.src('src')
        .pipe(server({
            port: '9292',
            livereload: true,
            open: true,
            middleware: function(req, res, next) {
                if (req.url === '/render') {

                    res.end(JSON.stringify(data));

                }
                next()
            }
        }))
})
gulp.task('copyCss', function() {
    gulp.src('src/scss/*.css')
        .pipe(gulp.dest('src/css'))
})

gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['minCss']) //监听Scss，实行刷新
})
gulp.task('dev', ['minCss', 'server', 'watch'])