---
title: Map Components
layout: 'layouts/map-components-overview.njk'
eleventyNavigation:
  key: mapComponentsEN
  title: Map Components
  locale: en
  order: 0
translationKey: 'mapcomponents'
date: 'git Last Modified'
nocrawl: true
github: https://github.com/nrcan/gcds-map
linkOverrides:
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

Map components provide mapping functionality for displaying and interacting with geographic data. Each component comes with reusable code, best practice advice, and accessibility tips.

{# docLinks is a custom Eleventy paired shortcode that generates a list of documentation resource links (GitHub and Figma) with an optional stage/phase badge. Its parameters must be in order: locale, stage, figma, github comma-separated parameters advisable #}
{% docLinks locale, stage, figma, github %}
{% enddocLinks %}
