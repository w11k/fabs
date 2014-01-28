'use strict';

module.exports = function (karmaConfig) {
  karmaConfig.set({
    /** 
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      <%= scripts.map(function(file) { return '\'' + file + '\'' }).join(',\n      ') %>
    ],
    frameworks: [
      'ng-scenario'
    ],
    plugins: [
      'karma-ng-scenario',
      'karma-phantomjs-launcher',
      'karma-junit-reporter'
    ],

    proxies: {
      '/': 'http://localhost:<%= connect_e2e_port %>/'
    },


    /**
     * How to report, by default.
     */
    reporters: [
      'progress'
    ],

    junitReporter: {
      outputFile: '<%= junit_results %>'
    },

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9011,
    runnerPort: 9111,
    urlRoot: '/tests/e2e/',

    /**
     * Disable file watching by default.
     */
    autoWatch: false,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      <%= browsers.map(function(browser) { return '\'' + browser + '\'' }).join(',\n      ') %>
    ]
  });
};

