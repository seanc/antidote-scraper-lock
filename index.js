module.exports = function createMixin(site = '', duration = 1000) {
  return {
    name: 'scraper-lock',
    events: {
      "monitors.removed"({
        site: modifiedSite
      }) {
        site = site || this.metadata.site
        if (modifiedSite === site) {
          this.logger.info("Products removed... locking crawler execution...");
          this.lock = true;
          setTimeout(
            function () {
              this.lock = false;
              this.logger.info("Unlocked crawler execution");
            }.bind(this),
            duration
          );
        }
      }
    }
  }
}