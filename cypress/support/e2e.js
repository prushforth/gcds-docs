// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-axe'
import 'cypress-html-validate/commands'

// The heavy design pages embed many live maps that load remote resources
// (tiles/MapML/PMTiles/GeoJSON/links). Slow or failed loads can surface as
// unhandled promise rejections in the map component, which are unrelated to
// accessibility but would fail the test as uncaught exceptions and cause flaky
// retries. Don't let app-originated exceptions fail these a11y tests.
Cypress.on('uncaught:exception', () => false);