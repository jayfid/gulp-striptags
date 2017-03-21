'use strict';

const striptags = require('striptags');//.init_streaming_mode;
const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-striptags';


module.exports = function(options) {
    options = options || {};
    return through.obj(function(file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        if (!file.isBuffer()) {
            cb(new PluginError(PLUGIN_NAME, 'Unsupported input.'));
        }

        file.contents = new Buffer(striptags(String(file.contents), options));

        cb(null, file);
    });
};
