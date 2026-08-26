const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Map pages render many heavy Leaflet/MapML DOM trees; limit retained
  // command snapshots to avoid the Cypress runner OOM-crashing on them.
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 0,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        },
      });
    },
    baseUrl: 'http://localhost:8080',
    viewportWidth: 1280,
    viewportHeight: 850,
    screenshotOnRunFailure: false,
    video: false,
    retries: {
      runMode: 0,
      openMode: 0,
    },
  },
});
