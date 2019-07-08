module.exports = {
  before(client) {
    this.homepage = client.page.home();
  },

  startHomepage: function(c) {
    this.homepage.navigate();
    this.homepage.expect.section('@indexContainer').to.be.visible;
  },

  'check if version dropdown is enabled and contains the correct version' (client) {
    const navigation = this.homepage.section.navigation;
    const navbarHeader = navigation.section.navbarHeader;
    const indexContainer = this.homepage.section.indexContainer;
    const linkSection = indexContainer.section.download;

    navbarHeader.expect.element('@versionDropdown').to.be.enabled;
    navbarHeader.expect.element('@versionDropdownOption:first-child').text.to.equal('1.1.13')
      /*
    navbarHeader.moveToElement('#index-container > div.download > div > div > div.col-lg-7.col-md-7.col-sm-4.download > a.btn.btn-primary.btn-lg.btn-github', 5, 5, function() {
      navbarHeader.waitForElementVisible('#index-container > div.download > div > div > div.col-lg-7.col-md-7.col-sm-4.download > a.btn.btn-primary.btn-lg.btn-github', 500, function() {
        navbarHeader.click('#index-container > div.download > div > div > div.col-lg-7.col-md-7.col-sm-4.download > a.btn.btn-primary.btn-lg.btn-github');
      }, 'Clicked git hub icon');
      */
    linkSection.moveToElement('@gitHubButton', 5, 5, function() {
      linkSection.waitForElementVisible('@gitHubButton', 500, function() {
        linkSection.click('@gitHubButton');
      }, 'Clicked git hub icon');
      client.windowHandles(function(result) {
        this.verify.equal(result.value.length, 2, 'Found 2 browser windows')
        gitHubID = result.value[1];
        client.switchWindow(gitHubID);
      })
      .waitForElementVisible('body', 'Page has loaded')
      .getTitle(function (title) {
        this.verify.equal(typeof title, 'string', 'Title is a string');
        this.expect.title().to.contain('GitHub - nightwatchjs/nightwatch', 'New window title - ' + title);
      });
    });
  },

  after(client) {
    client.end();
  }
};
