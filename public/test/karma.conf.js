// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-07-18 using
// generator-karma 0.8.3

module.exports = function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            '../node_modules/angular/angular.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            // ng-app
            'public/js/finance/*.js',
            'public/js/weather/*.js',
            'public/js/utility/*.js',
            // Test files
            'test/spec/**/*.specs.js',

        ],

        // list of files / patterns to exclude
        exclude: [

        ],

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'Firefox'
       //     'Chrome'
        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-junit-reporter',
            'karma-firefox-launcher',
        ],

        reporters: ['junit'],

        junitReporter: {
            outputFile: 'test-results/junit.xml',
            suite: ''
        },

//        preprocessors: {
  //          'WebContent/partials/**/*.html': ['ng-html2js']
    //    },

 //       ngHtml2JsPreprocessor: {
 //           stripPrefix: 'WebContent/',
 //           moduleName: 'partialTemplates'
  //      },
        // Timeouts
        browserNoActivityTimeout: 60000,
        browserDisconnectTolerance: 5,
        browserDisconnectTimeout: 10000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        // singleRun: false,
        singleRun: true,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
