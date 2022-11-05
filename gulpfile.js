// Initialization
const pump = require('pump');
const {series, watch, src, dest, parallel} = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const gulpZip = require('gulp-zip');
const beeper = import('beeper');

// Assets paths assigned
const paths = {
  script: {
    src: 'assets/js/script.js',
    dest: 'assets/built/'
  }
};

// Zip filename assigned 
const themeZip = require('./package.json').name + '.zip';
  
// Handling errors
const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

//  Function for .hbs files 
function hbs_files(done) {
    pump([
        src(['*.hbs', 'partials/*.hbs', 'assets/css/*.css']),
        browserSync.stream()
    ], handleError(done));
}

// Function for script file
function scripts(done) {
    pump([
        src(paths.script.src, {sourcemaps: true}),
        babel({
            presets: ['@babel/env']
        }),
        concat('main.min.js'),
        uglify(),
        dest(paths.script.dest, {sourcemaps: '.'}),
        browserSync.stream()
    ], handleError(done));
}

// Function to build the zip file of the theme
function zip(done) {
    pump([
        src(['**', '!node_modules', '!node_modules/**','!dist', '!dist/**']),
        gulpZip(themeZip),
        dest('dist/')
    ], handleError(done));
}

// Assigned css, js, hbs files watcher, purgeCSS, and browserload.
const jsWatcher = () => watch('assets/js/main.js', scripts);
const hbsWatcher = () => watch(['*.hbs', 'partials/*.hbs', 'assets/css/*.css'], hbs_files);
const browserLoad = () => browserSync.init({proxy: "http://localhost:2368"});
const watcher = parallel(jsWatcher, hbsWatcher, browserLoad);
const build = series(scripts);

// All exports
exports.scripts = scripts;
exports.build = build;
exports.zip = series(build, zip);
exports.default = series(build, watcher);
