/// <reference types="cypress" />

const frLinks = require('../../src/fr/fr.json');

const pagesFr = [];

// Only test the map and layer component pages built for this project
Object.keys(frLinks.links).forEach(key => {
  if (key !== 'map' && key !== 'mapLayer') {
    return;
  }
  const url = frLinks.links[key];
  const pageName = key.replace(/([A-Z])/g, ' $1');
  pagesFr.push({
    name: `${pageName} - use case`,
    url,
  });
  pagesFr.push({
    name: `${pageName} - design`,
    url: `${url}/design/`,
  });
  pagesFr.push({
    name: `${pageName} - code`,
    url: `${url}/code/`,
  });
  if (key === 'mapLayer') {
    pagesFr.push({
      name: `${pageName} - data`,
      url: `${url}/donnees/`,
    });
  }
});

describe(`A11Y test French documentation site`, () => {
  for (const page of pagesFr) {
    it(`${page.name}: ${page.url}`, () => {
      cy.visit(page.url, { timeout: 30000 });
      cy.get('gcds-header.hydrated');
      // Wait for the gcds-grid-wrapped main content to become visible; gcds-grid
      // is visibility:hidden until it hydrates, which would otherwise hide
      // <main>/<h1> and trigger landmark-one-main / page-has-heading-one.
      cy.get('main#mc').should('be.visible');
      // On heavy map pages, wait for every gcds-ext-map instance to finish
      // hydrating before running axe, so hydration-hidden content doesn't
      // trip landmark/heading checks and force flaky retries. No-op on pages
      // without maps.
      cy.get('main#mc').then($main => {
        const mapCount = $main.find('gcds-ext-map').length;
        if (mapCount > 0) {
          cy.get('gcds-ext-map.hydrated', { timeout: 30000 }).should(
            'have.length',
            mapCount,
          );
        }
      });
      cy.injectAxe();
      cy.checkA11y(null, null, cy.terminalLog);
      // skip theme and topic menu since links are pulled from external source
      if (!page.url.includes('menu-thematique')) {
        cy.scanDeadLinks();
      }
    });
  }
});
