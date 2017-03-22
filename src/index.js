'use strict';

const PLUGIN_NAME = 'gulp-striptags';

const util = require('striptags');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
var through = require('through2');

module.exports = function(options) {
    options = options || {};

    return through.obj(function(file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(util(String(file.contents), options));
        }

        cb(null, file);
    });
};
