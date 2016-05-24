// An example configuration file.
exports.config = {
    seleniumServerJar: '../node_modules/nxn-selenium-tools/bin/selenium-server-standalone.jar',
    directConnect: false,
    framework: 'jasmine',

    // Capabilities to be passed to the webdriver instance.
    /*capabilities: {
        'browserName': 'chrome'
    },*/
   capabilities: {
    'browserName': 'firefox'
  },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['./e2e/finance/*.spec.js'],

    baseUrl: 'http://localhost:3000/',
    getPageTimeout: 45000,
    allScriptsTimeout: 45000,
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 100000
    },

     
};
