//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',
    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    files: [
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      'lib/bootstrap//bootstrap-tagsinput.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(lib)/**/*!(.module|.spec).js',
      '**/*.spec.js',
      '**/*.html'
    ],

    html2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',
 
      // prepend this to the file path
      prependPrefix: 'served/',
 
      // or define a custom transform function
      processPath: function(filePath) {
        // Drop the file extension
        return filePath.replace(/\.html$/, '');
      }
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'ng-html2js'
    ]

  });
};
