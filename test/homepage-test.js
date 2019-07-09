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
      
    // tried to add command to page object fails with  Cannot read property 'element' of undefined
    //this.homepage.moveToElementclickElement('@gitHubButton', function() {
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
