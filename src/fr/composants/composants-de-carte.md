---
title: Composants de carte
layout: 'layouts/map-components-overview.njk'
eleventyNavigation:
  key: mapComponentsFR
  title: Composants de carte
  locale: fr
  order: 0
translationKey: 'mapcomponents'
date: 'git Last Modified'
nocrawl: true
github: https://github.com/nrcan/gcds-map
eleventyComputed:
  links:
    githubCompsIssues: https://github.com/nrcan/gcds-map/issues
  helpus:
    en:
      feedbackHref: mailto:geo@nrcan-rncan.gc.ca
    fr:
      feedbackHref: mailto:geo@rncan-nrcan.gc.ca
cardlist:
  type: mapComponents
  state: published
templateEngineOverride: njk,md
---

# {{ title }}

Les composants de carte fournissent des fonctionnalités cartographiques pour afficher et interagir avec des données géographiques. Chaque composant comprend du code réutilisable, des conseils sur les meilleures pratiques et des conseils d'accessibilité.

{# docLinks is a custom Eleventy paired shortcode that generates a list of documentation resource links (GitHub and Figma) with an optional stage/phase badge. Its parameters must be in order: locale, stage, figma, github comma-separated parameters advisable #}
{% docLinks locale, stage, figma, github %}
{% enddocLinks %}
