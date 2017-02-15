'use strict';

module.exports = function(config) {

  var configuration = {
    autoWatch : false,

    logLevel: config.LOG_ERROR,

    frameworks: ['jasmine'],

    // files : [
    //   "builds/dev/serve/app/**/*.js"
    // ],

    // reporter options
    nyanReporter: {
      // suppress the error report at the end of the test run
      suppressErrorReport: false,

      // increase the number of rainbow lines displayed
      // enforced min = 4, enforced max = terminal height - 1
      numberOfRainbowLines : 4 // default is 4
    },

    dhtmlReporter: {
      'outputFile' : '/tests/dhtmlReport.html',
      'exclusiveSections': true,
      'openReportInBrowser': false
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'karma.templates'
      // moduleName: function (htmlPath, originalPath) {
      //   console.log('Karma: ', htmlPath);
      //   return 'karma.templates';
      // }
    },

    browsers : [
      // 'PhantomJS'
      // 'Chrome'
    ],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      "karma-chrome-launcher",
      // 'karma-mocha-reporter',
      'karma-nyan-reporter'
    ],

    preprocessors: {
      'src/**/*.html': ['ng-html2js']
    },

    // generates the coverage
    reporters: [
      // 'dots',
      'nyan',
      'coverage'
      // 'html',
      // 'mocha',
    ],

    // Output coverage file
    coverageReporter: {
      type   : 'lcov',
      subdir : 'report-lcov',
      // output path
      dir : 'coverage/',
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }

    },

    mochaReporter: {
      output: 'minimal'
    }

  };


  if(!config.suppressCoverage){
    configuration.preprocessors['builds/dev/serve/{app,components}/**/!(*spec|*mock).js'] = ['coverage'];
  }

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
