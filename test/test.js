'use strict';

var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var stream = require('stream');
var gulpStriptags = require('../src/');
require('mocha');
require('through2');


describe('gulp-striptags', function () {
    describe('with null input', function () {
        it('does nothing', function (done) {
            var testInstance = gulpStriptags();
            var testNull = new File();
            assert.doesNotThrow(
                () => {
                    testInstance.write(testNull);
                });
            done();
        });
    });
    describe('in streaming mode', function () {
        it('should throw', function (done) {
            var testStream = new File({
                contents: new stream.Readable({
                    objectMode: true
                }).wrap(es.readArray(['stream', 'with', 'those', 'contents']))
            });
            var testInstance = gulpStriptags();

            assert.throws(
                () => {
                    testInstance.write(testStream);
                });
            done();
        });
    });

    describe('in buffer mode', function () {
        describe('with no arguments', function () {
            it('should strip tags', function (done) {
                var testBuffer = new File({
                    contents: new Buffer('<a href="#">link</a>')
                });

                var testInstance = gulpStriptags();
                // write the fake file to it
                testInstance.write(testBuffer);

                // wait for the file to come back out
                testInstance.once('data', function (file) {
                    // make sure it came out the same way it went in
                    assert(file.isBuffer(), 'file is buffer');

                    // check the contents
                    assert.equal(file.contents.toString('utf8'), 'link');
                    done();
                });
            });
        });

        describe('with String argument', function () {
            it('should not strip argument tag', function (done) {
                var testBuffer = new File({
                    contents: new Buffer('<a href="#"><strong>link</strong></a>')
                });

                var testInstance = gulpStriptags('<strong>');
                // write the fake file to it
                testInstance.write(testBuffer);

                // wait for the file to come back out
                testInstance.once('data', function (file) {
                    // make sure it came out the same way it went in
                    assert(file.isBuffer(), 'file is buffer');

                    // check the contents
                    assert.equal(file.contents.toString('utf8'), '<strong>link</strong>');
                    done();
                });
            });
        });
    });
});


































// const striptags = require('../');
// var through = require('through2');
// require('should');
// require('mocha');
// const fs = require('fs');


// /* globals describe,it */
// describe('gulp-striptags', function () {
//     describe('with no args', function () {
//         it('should strip tags with no args', function () {
//             var inFile = fs.readFileSync('./test/test.html');


//             var renderedFileContents = 'hi';
//             var actual = `hi`;
//             renderedFileContents.should.equal(actual);
//         });
//     });
// });
