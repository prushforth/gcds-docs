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
  - [Layer `src` attribute](#layer-src-attribute)
  - [Layer and sub-layer `checked` attribute](#layer-and-sublayer-checked-attribute)
  - [Layer and sub-layer `hidden` attribute](#layer-and-sublayer-hidden-attribute)
  - [Layer and sub-layer `label` attribute](#layer-and-sublayer-label-attribute)
    - [Layer](#layer)
    - [Sub-layer](#sublayer)
  - [Layer and sub-layer `opacity` attribute](#layer-and-sublayer-opacity-attribute)
  - [Layer `media` queries](#layer-media-queries)
- [Code builder](#code-builder)

## Coding and accessibility for layers

Use the layer component to display Map Markup Language (MapML) content.

Use the component's `src` attribute to link to remote content, or create MapML content in-line in your HTML, between the `<map-layer>` start and `</map-layer>` end tags.

Set the initial properties of the layer using the `src`, `checked`, `hidden`, `label`, `opacity` and `media` attributes.

## Examples

### Layer `src` attribute

The optional `src` attribute can be used to provide the URL of a MapML document.  When the `src` attribute
is provided, we refer to this situation as "[remote content](../design/#remote-content)". A remote MapML
document is encoded as XHTML, and parsed with the browser's built-in XML parser. If no `src` attribute 
is provided, content can be provided between the begin and end `<map-layer>...</map-layer>` tags. 
This is called "[inline content](../design/#inline-content)". Map content is either tiles or features, 
or a combination of tiles and features. Tiles, features or a combination of both can be loaded by the map 
via a wrapper templating element called `<map-extent>`.  When a content template is used,
it is treated as a "[sub-layer](../design/#layers-and-sublayers)", for the purpose of exposing it to 
the user [in the layer control](../design/#anatomy). Content is rendered on the map in document order. That is, content at the 
bottom of the document is rendered on top of content from earlier in the document.  This matters especially when 
such contents overlap spatially, because later content may obscure earlier content e.g. tiles may overwrite features, and vice versa.  Generally, overlapping map content should be organized as separate layers, affording the 
user the means to turn it on or off, change the order, change opacity, or remove it altogether.    

### Layer and sub-layer `checked` attribute

The `checked` attribute and its corresponding property allow scripts to turn content on or off without removing
the content from the DOM. `checked` reflects the user control checkbox state.  When changed by the user, the layer emits the `map-change` event.

### Layer and sub-layer `hidden` attribute

Use the `hidden` attribute to keep a layer or sub-layer visible on the map but hidden from the
layer control.  This is useful for basemap layers that should always be shown. It's often a good idea to add
`hidden` to sub-layers of layers that have simple content, so as to simplify the map user interface - every
little bit helps.

If _all_ layers in a map are `hidden`, the layer control itself is hidden. See for yourself by removing the 
overlay from the map below. 

<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer checked hidden src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/en/osmtile/cbmt' | url }}"></map-layer>
  <map-layer label="Current Conditions" checked>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18" ></map-input>
      <map-input name="xmin" type="location" rel="map" position="top-left" axis="easting"
          units="pcrs" min="-1.8443827380300004E7" max="-2287187.2902772236" ></map-input>
      <map-input name="ymin" type="location" rel="map" position="bottom-left" axis="northing"
          units="pcrs" min="4547345.566611593" max="1.6344676582521891E7" ></map-input>
      <map-input name="xmax" type="location" rel="map" position="top-right" axis="easting"
          units="pcrs" min="-1.8443827380300004E7" max="-2287187.2902772236" ></map-input>
      <map-input name="ymax" type="location" rel="map" position="top-left" axis="northing"
          units="pcrs" min="4547345.566611593" max="1.6344676582521891E7" ></map-input>
      <map-input name="w" type="width" min="1" max="4079" ></map-input>
      <map-input name="h" type="height" min="1" max="4079" ></map-input>
      <map-link rel="image" tref="https://geo.weather.gc.ca/geomet?request=GetMap&crs=EPSG:3857&service=WMS&bbox={xmin},{ymin},{xmax},{ymax}&layers=CURRENT_CONDITIONS&format=image/png&width={w}&styles=default&language=en&version=1.3.0&transparent=true&height={h}"></map-link>
    </map-extent>
  </map-layer>
</gcds-ext-map>

```html
<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer checked hidden src="basemap.mapml"></map-layer>
  <map-layer label="Current Conditions" checked>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18" ></map-input>
      <map-input name="xmin" type="location" rel="map" position="top-left" axis="easting"
          units="pcrs" min="-1.8443827380300004E7" max="-2287187.2902772236" ></map-input>
      <map-input name="ymin" type="location" rel="map" position="bottom-left" axis="northing"
          units="pcrs" min="4547345.566611593" max="1.6344676582521891E7" ></map-input>
      <map-input name="xmax" type="location" rel="map" position="top-right" axis="easting"
          units="pcrs" min="-1.8443827380300004E7" max="-2287187.2902772236" ></map-input>
      <map-input name="ymax" type="location" rel="map" position="top-left" axis="northing"
          units="pcrs" min="4547345.566611593" max="1.6344676582521891E7" ></map-input>
      <map-input name="w" type="width" min="1" max="4079" ></map-input>
      <map-input name="h" type="height" min="1" max="4079" ></map-input>
      <map-link rel="image" tref="https://geo.weather.gc.ca/geomet?request=GetMap&crs=EPSG:3857&service=WMS&bbox={xmin},{ymin},{xmax},{ymax}&layers=CURRENT_CONDITIONS&format=image/png&width={w}&styles=default&language=en&version=1.3.0&transparent=true&height={h}"></map-link>
    </map-extent>
  </map-layer>
</gcds-ext-map>
```

### Layer and sub-layer `label` attribute

The `label` attribute provides an accessible name for a layer or sub-layer in the layer control. If a
`<map-title>` element is present as a descendant of the `<map-layer>` (for layers only), its text value takes precedence 
over the  `<map-layer label="">` attribute. If neither is provided, the layer control falls back to a generic default 
name ("Layer" or "Sub-layer"), which is unhelpful to users — so always give your content a meaningful name via 
`<map-title>` or `label`.

#### Layer

For a layer, the name shown in the layer control is chosen in this order:

1. The text content of a `<map-title>` child element, if present.
2. The value of the `<map-layer label="...">` attribute, if present.
3. The default name "Layer".

Because a `<map-title>` element in remote content is authored alongside the layer's data, it is generally the
authoritative source of the layer's name. The `label` attribute is a useful fallback when you don't control
the remote content, or when authoring inline content and you prefer to keep the name in the host page's HTML.

#### Sub-layer

Sub-layers follow the same precedence rules as layers: a `<map-title>` inside the `<map-extent>` takes
precedence over the `<map-extent label="...">` attribute, which in turn takes precedence over the default
name "Sub-layer".

However, if a sub-layer is not meaningfully distinct from its parent layer, for example, when a layer
contains a single `<map-extent>` that provides all of its content, it is often better to apply the `hidden`
attribute to the `<map-extent>` rather than giving it a label. This keeps the sub-layer out of the layer
control and simplifies the user experience. Reserve labels for sub-layers that users actually need to toggle,
reorder, or adjust the settings of independently of their parent layer.

### Layer and sub-layer `opacity` attribute

The `opacity` attribute (0–1, 0.1 increments) controls layer and sub-layer transparency, which are cumulative. 
Users can also adjust opacity via the layer control slider.  In general, leave the opacity of layers up to the 
user's discretion.

<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer opacity="0.5" checked src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/en/osmtile/cbmt' | url }}"></map-layer>
</gcds-ext-map>

```html
<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer opacity="0.5" checked src="layer.mapml"></map-layer>
</gcds-ext-map>
```

### Layer `media` queries

The `media` attribute accepts a 
[map media query](https://maps4html.org/web-map-doc/docs/api/mapml-viewer-api#supported-map-media-query-features). 
When specified, the layer is active only when the query matches the current map state (e.g. the map zoom corresponds to 
a specified range), and disabled otherwise.  Try zooming in past zoom level 6 to see the overlay layer 
(and the layer control itself) disappear.

<div style="position: relative;">
  <gcds-ext-map id="zoom-demo-map" lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
    <map-layer checked hidden src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/en/osmtile/cbmt' | url }}"></map-layer>
    <map-layer checked media="(0 <= map-zoom <= 6)" src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/en/osmtile/current_conditions' | url }}"></map-layer>
  </gcds-ext-map>
  <gcds-text id="zoom-demo-text" character-limit="false" margin-bottom="0" style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); z-index: 1000; background: rgba(255, 255, 255, 0.85); padding: 0.25rem 0.5rem; border-radius: 4px; color: #000; pointer-events: none;">Zoom = 4</gcds-text>
</div>
<script>
  (function () {
    var map = document.getElementById('zoom-demo-map');
    var text = document.getElementById('zoom-demo-text');
    if (!map || !text) return;
    var update = function () {
      text.textContent = 'Zoom = ' + map.zoom;
    };
    map.addEventListener('zoomend', update);
    map.addEventListener('map-moveend', update);
  })();
</script>

```html
<gcds-ext-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="basemap.mapml" checked hidden></map-layer>
  <map-layer media="(0 <= map-zoom <= 6)" checked src="overlay.mapml"></map-layer>
</gcds-ext-map>
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
  allow="clipboard-write; fullscreen"
  allowfullscreen></iframe>

{% include "partials/storybook-resize.njk" %}

{% include "partials/map-live-code.njk" %}

