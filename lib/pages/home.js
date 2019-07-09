let homePageCommands = {
  moveToElementclickElement: (element) => {
    let self = this;
    return self.api.element(element, (res) => {
      self.api.moveTo(res.value.ELEMENT, 5, 5, () => {
        self.waitForElementVisible(element, "Found " + element);
        self.click(element);
      })
    });
  }
};
module.exports = {
  url: '/',
  commands: [homePageCommands],
  elements: {
    indexContainer: '#index-container'
  },
  sections: {
    navigation: {
      selector: '#navigation',

      sections: {
        navbarHeader: {
          selector: '.navbar-header',
          index: 2,

          elements: {
            versionDropdown: 'select.version-dropdown',
            versionDropdownOption: 'select.version-dropdown option',
          }
        }
      }
    },

    indexContainer: {
      selector: '#index-container',
      sections: {
        download: {
          selector: '.download',
          elements: {
            installButton: '.btn-download',
            gitHubButton: '.btn-github'
          }
        }
      }
    }
  }
};
