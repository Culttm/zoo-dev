// dependencies
var gulp = require('gulp');
var eta = require('gulp-eta');


var config = {};

config.scaffold = {
    "assets": {
        "root":       "public",
        "images":     "images",
        "browserify": "js",
        "sprites":    "images/sprites",
        "sass":       "css",
        "symbols":    "symbols",
        "static":     ""
    },
    "source": {
        "root":  "_src"
    }
};


config.symbols = {
    "fontPath": "../symbols\\/\\"
};

config.browserSync = {
    "settings":{
        "server": {
            "baseDir": 'public'
        },
        "open": false,
        "codeSync": false
    }
};

config.browserify = {
    "transform": ['browserify-shim', 'babelify'],
    "uglify": false,
},



config.default = {
    "tasks": [
        'images',
        'browserify',
        'sass',
        'sprites',
        'symbols',
        'static',
        'browserSync'
    ]
};

gulp.task('moveAssets', function() {
    gulp.src(config.scaffold.source.root + '/assets/**/*')
        .pipe(gulp.dest(config.scaffold.assets.root + '/assets'))
});

eta(gulp, config);
