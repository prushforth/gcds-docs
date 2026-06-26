---
title: Layer
layout: 'layouts/component-documentation.njk'
loadGcdsMap: true
translationKey: 'maplayerCode'
tags: ['maplayerEN', 'code']
date: 'git Last Modified'
---

## On this page

- [Coding and accessibility for layers](#coding-and-accessibility-for-layers)
- [Examples](#examples)
  - [`src` attribute](#src-attribute)
  - [`checked` attribute](#checked-attribute)
  - [`hidden` layers and sub-layers](#hidden-attribute)
  - [`label` attribute](#label-attribute)
  - [Layer and sub-layer `opacity`](#layer-and-sublayer-opacity)
  - [`media` queries](#media-queries)
- [Code builder](#code-builder)

## Coding and accessibility for layers

Use the layer component to display Map Markup Language (MapML) content.

Use the component's `src` attribute to link to remote content, or create MapML content in-line in your HTML, between the `<map-layer>` start and `</map-layer>` end tags.

Set the initial properties of the layer using the `src`, `checked`, `hidden`, `label`, `opacity` and `media` attributes.

### `src` attribute

### `checked` attribute

### `hidden` attribute

Use the `hidden` attribute to keep a layer visible on the map but hidden from the
layer control.  This is useful for basemap layers that should always be shown. 
If there are no non-`hidden` layers in a map, the layer control is itself automatically hidden. 

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer checked hidden src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}"></map-layer>
  <map-layer checked src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/current_conditions' | url }}"></map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer checked hidden src="basemap.mapml"></map-layer>
  <map-layer checked src="current_conditions.mapml"></map-layer>
</gcds-map>
```

### Layer and sub-layer `opacity`

The `opacity` attribute (0–1) controls layer transparency. Users can also adjust
opacity via the layer control slider.  In general, leave the opacity or transparency 
of layers up to the user's discretion.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer opacity="0.5" checked src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}"></map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer opacity="0.5" checked src="layer.mapml"></map-layer>
</gcds-map>
```

### `media` queries

The `media` attribute accepts a 
[map media query](https://maps4html.org/web-map-doc/docs/api/mapml-viewer-api#supported-map-media-query-features). 
When specified, the layer is active only when the query matches the current map state (e.g. the map zoom corresponds to 
a specified range), and disabled otherwise.  Try zooming in past zoom level 6 to see the overlay layer 
(and consequently, the layer control) disappear.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer checked hidden src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}"></map-layer>
  <map-layer checked media="(0 <= map-zoom <= 6)" src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/current_conditions' | url }}"></map-layer>
</gcds-map>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="basemap.mapml" checked hidden></map-layer>
  <map-layer media="(0 <= map-zoom <= 6)" checked src="overlay.mapml"></map-layer>
</gcds-map>
```

## Code builder

{% include "partials/getcode.njk" %}

<!-- height="100" is a placeholder; the storybook-resize partial auto-sizes this iframe -->
<iframe
  title="map-layer code builder with properties and events."
  src="https://nrcan.github.io/gcds-map/storybook/iframe.html?id=components-layer--events-properties&viewMode=docs&demo=true&singleStory=true&lang=en"
  width="100%"
  height="100"
  style="display: block; border: 0;"
  scrolling="no"
  frameBorder="0"
  allow="clipboard-write"></iframe>

{% include "partials/storybook-resize.njk" %}

{% include "partials/map-live-code.njk" %}

