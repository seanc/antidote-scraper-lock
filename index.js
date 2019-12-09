module.exports = function createMixin(site = '') {
  return {
    name: 'scraper-lock',
    events: {
      "monitors.removing"({
        site: modifiedSite
      }) {
        let _site = site || this.metadata.site
        if (modifiedSite === _site) {
          this.logger.info("Products removed... locking crawler execution...");
          this.lock = true;
        }
      },
      'monitors.removed'({
        site: modifiedSite
      }) {
        let _site = site || this.metadata.site
        if (modifiedSite === _site) {
          this.lock = false;
          this.logger.info("Unlocked crawler execution");
        }
      }
    }
  }
}