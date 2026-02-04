---
title: Layer
layout: 'layouts/component-documentation.njk'
translationKey: 'maplayerCode'
tags: ['maplayerEN', 'code']
date: 'git Last Modified'
---

## Render map content as layers

Use the layer component to display Map Markup Language (MapML) content. 

Use the component's `src` attribute to link to the content, or create MapML content in-line in your HTML, between the `<map-layer>` start and `</map-layer>` end tags.

Set the initial properties of the layer using the `checked`, `hidden`, `opacity` and `media` attributes.

{% include "partials/getcode.njk" %}

<iframe
  title="Overview of map-layer properties and events."
  src="https://nrcan.github.io/gcds-map/storybook/iframe.html?id=components-map--events-properties&viewMode=docs&demo=true&singleStory=true&lang=en"
  width="1200"
  height="2075"
  style="display: block; margin: 0 auto;"
  frameBorder="0"
  allow="clipboard-write"
></iframe>
