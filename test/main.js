'use strict';

const striptags = require('../');
const assert = require('assert');
const fs = require('fs');
const File = require('vinyl');

 describe('gulp-striptags', function() {
     describe('with no args', function() {
        assert.equal('hi');
     });
 });
