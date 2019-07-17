const chromedriver = require('chromedriver');

module.exports = {
  src_folders: ['test'],
  page_objects_path : 'lib/pages',
  custom_commands_path : 'lib/custom-commands',
  custom_assertions_path : 'lib/custom-assertions',

  webdriver: {
    start_process: true,
    port: 4444,
    server_path: 'node_modules/.bin/geckodriver',
    cli_args: [
      '--log', 'trace',
      // Can be used for a faster startup of Firefox, which needs to be started using: firefox -marionette
      // '--connect-existing',
      '--marionette-port', '2828'
    ]
  },

  // to add profile to firefox
  // "args": [ "-profile", "testProfile_encoded.tar.bz2", "-headless"]
  test_settings: {
    default: {
      desiredCapabilities : {
        browserName : 'firefox',
        javascriptEnabled : true,
        alwaysMatch: {
          acceptInsecureCerts: true,
          "moz:firefoxOptions": {
            "binary": "/opt/firefox-60/firefox"
          } 
        }
      },

      launch_url: 'https://nightwatchjs.org',

      globals: {
        // NIGHTWATCH_VERSION is defined as an environment variable (.env files are supported also)
        nightwatchVersion: '${NIGHTWATCH_VERSION}'
      }
    },

    firefox_headless: {
      desiredCapabilities : {
        browserName : 'firefox',
        javascriptEnabled : true,
        alwaysMatch: {
          acceptInsecureCerts: true,
          "moz:firefoxOptions": {
            "args": ["-headless"],
            "binary": "/opt/firefox-60/firefox"
          } 
        }
      }
    },
    safari: {
      desiredCapabilities : {
        browserName : 'safari',
        alwaysMatch: {
          acceptInsecureCerts: false
        }
      },
      webdriver: {
        port: 4445,
        server_path: '/usr/bin/safaridriver'
      }
    },

    chrome: {
      desiredCapabilities : {
        browserName : 'chrome',
        chromeOptions: {
          "w3c": false
        }
      },
      webdriver: {
        port: 9515,
        server_path: chromedriver.path
      }
    },
    chrome_headless: {
      desiredCapabilities : {
        browserName : 'chrome',
        chromeOptions: {
           "args": [
             "disable-web-security", 
             "headless", 
             "no-sandbox", 
             "disable-gpu", 
             "ignore-certificate-errors", 
             "remote-debugging-port=9233"],
          "w3c": false
        }
      },
      webdriver: {
        port: 9515,
        server_path: chromedriver.path
      }
    }
  }
};
