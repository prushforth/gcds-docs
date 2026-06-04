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
  - [Provide an accessible name for non-hidden layers](#provide-an-accessible-name-for-nonhidden-layers)
  - [Hide map content that is not relevant using map media queries](#hide-map-content-that-is-not-relevant-using-map-media-queries)
  - [Ensure visual content has enough contrast](#ensure-visual-content-has-enough-contrast)
- [Examples](#examples)
  - [Remote layer content](#remote-layer-content)
  - [Inline layer content](#inline-layer-content)
  - [Hidden basemap](#hidden-basemap)
  - [Opacity](#opacity)
  - [Inline image content](#inline-image-content)
  - [Media query](#media-query)
  - [Combining remote and inline layers](#combining-remote-and-inline-layers)
- [Code builder](#code-builder)

## Coding and accessibility for layers

Use the layer component to display Map Markup Language (MapML) content.

Use the component's `src` attribute to link to remote content, or create MapML content in-line in your HTML, between the `<map-layer>` start and `</map-layer>` end tags.

Set the initial properties of the layer using the `src`, `checked`, `hidden`, `label`, `opacity` and `media` attributes.

### Provide an accessible name for non-hidden layers

If a layer is important enough, it should have a meaningful name available to all users.  A layer
name is presented via the layer control.  If a layer contains a child `<map-title>foo</map-title>` element,
that element's text value ("foo", in this case) is always used for the layer control name; if the layer lacks a 
`<map-title>` element, the layer control name falls back to the `<map-layer label="bar">` `label`
attribute value, if present ("bar" in the latter instance).  If neither of those values is available, 
the layer control name of the layer is set to "Layer", which is not very helpful to users.  Consequently, it's important
to ensure that your content layers are meaningfully named.

### Hide map content that is not relevant using map media queries

If certain map content is not relevant depending on conditions that can be identified by map media expressions,
organize the content into distinct `<map-layer>` elements, and use the `media` attribute to show or hide
the layer accordingly.

### Ensure visual content has enough contrast

Don't rely on colour alone to disinguish map features.  Use high colour contrast, and different shapes and symbology 
where possible - your organization may not always own the data your map presents, but providing accessibility 
feedback to map providers is helpful to all users.  

In general, leave the opacity or transparency of layers up to the user.

## Examples

### Remote layer content

A remote layer fetches its content from a MapML document URL, pointed to by the
`<map-layer src="...">` `src` attribute. The MapML document is parsed as XHTML, using the 
built-in XML parser. Remote MapML documents **must** be declared in the XHTML namespace, 
[using the `xmlns` attribute](https://maps4html.org/web-map-doc/docs/elements/mapml/#xmlns),
and they **must** be [well-formed XML](https://en.wikipedia.org/wiki/Well-formed_document).

If remote (or inline) MapML content contains the `<map-title>` element, that element's text 
value becomes the layer name in the layer control. If no `<map-title>` element is found, the layer
name falls back to the value of the `label` attribute, if present. If that value is not
found either, the layer name defaults to "Layer".

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}" checked></map-layer>
</gcds-map>

<details>
<summary>Show code</summary>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="https://example.com/path/to/layer.mapml" checked></map-layer>
</gcds-map>
```

</details>

### Inline layer content

When the `src` attribute is not set, layer content is provided by child elements of `<map-layer>`. 
Note that inline content **must** be encoded as HTML. It is especially important for 
non-[void](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) 
HTML tags to end with a closing tag, and to **not** use the XML `<tag />` 
[self-closing tag syntax](https://developer.mozilla.org/en-US/docs/Glossary/Void_element#self-closing_tags), 
which is not recognized by the HTML parser and can cause problems.

It is especially important to be aware of the differences between the XML self-closing and HTML void element 
syntax when copy-pasting content from XML-encoded MapML documents into an HTML-encoded .html file. A best 
practice for creating standalone MapML (XML-XHTML) documents is to avoid the self-closing XML tag form and to
always include an explicit closing tag e.g.  `</map-link>` or `</map-input>`, which is still well-formed XML.  
That way, when copy-pasting such content from a MapML document into an HTML document, the pitfalls caused 
by the seemingly small difference between the syntaxes may be avoided.

This example shows an inline feature with a polygon geometry defined in geographic coordinates (`cs="gcrs"`). 

<gcds-map lat="45.5" lon="-74.5" zoom="3" projection="CBMTILE" controls style="height: 400px;">
<map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/cbmtile/cbmtsimple' | url }}" checked hidden></map-layer>
  <map-layer label="Inline Feature Layer" checked>
    <map-meta name="projection" content="CBMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=5"></map-meta>
    <map-link rel="license"
      href="https://open.canada.ca/en/open-government-licence-canada"
      title="Open Government Licence - Canada"></map-link>
    <map-feature zoom="2">
      <map-featurecaption>A sample feature</map-featurecaption>
      <map-properties>
        <h2>Sample Polygon</h2>
        <p>This feature is defined inline within the map-layer element.</p>
      </map-properties>
      <map-geometry cs="gcrs">
        <map-polygon>
          <map-coordinates>-75 45 -74 45 -74 46 -75 46 -75 45</map-coordinates>
        </map-polygon>
      </map-geometry>
    </map-feature>
  </map-layer>
</gcds-map>

<details>
<summary>Show code</summary>

```html
<gcds-map lat="45.5" lon="-74.5" zoom="3" projection="CBMTILE" controls>
  <map-layer label="Inline Feature Layer" checked>
    <map-meta name="projection" content="CBMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=5"></map-meta>
    <map-feature zoom="2">
      <map-featurecaption>A sample feature</map-featurecaption>
      <map-properties>
        <h2>Sample Polygon</h2>
      </map-properties>
      <map-geometry cs="gcrs">
        <map-polygon>
          <map-coordinates>-75 45 -74 45 -74 46 -75 46 -75 45</map-coordinates>
        </map-polygon>
      </map-geometry>
    </map-feature>
  </map-layer>
</gcds-map>
```

</details>

### Hidden basemap

Use the `hidden` attribute to keep a layer visible on the map but hidden from the
layer control.  This is useful for basemap layers that should always be shown. 
If there are no non-`hidden` layers in a map, the layer control is automatically hidden. 

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}" checked hidden></map-layer>
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/current_conditions' | url }}" checked></map-layer>
</gcds-map>

<details>
<summary>Show code</summary>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="basemap.mapml" checked hidden></map-layer>
  <map-layer src="current_conditions.mapml" checked></map-layer>
</gcds-map>
```

</details>

### Opacity

The `opacity` attribute (0–1) controls layer transparency. Users can also adjust
opacity via the layer control slider.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}" checked opacity="0.5"></map-layer>
</gcds-map>

<details>
<summary>Show code</summary>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="layer.mapml" checked opacity="0.5"></map-layer>
</gcds-map>
```

</details>

### Inline image content

An inline layer can also contain `<map-extent>` elements that define templated
tiled or whole-viewport image requests, fetched dynamically as the user pans and zooms the map.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer label="CBMT (inline extent)" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="22"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-link rel="image" tref="https://geogratis.gc.ca/cartes/CBCT?SERVICE=WMS&amp;VERSION=1.1.1&amp;SRS=EPSG:3857&amp;LAYERS=CBCT&amp;BBOX={xmin},{ymin},{xmax},{ymax}&amp;REQUEST=GetMap&amp;FORMAT=image/png&amp;TRANSPARENT=TRUE&amp;WIDTH={w}&amp;HEIGHT={h}&amp;STYLES="></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

<details>
<summary>Show code</summary>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer label="CBMT (inline extent)" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="22"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-link rel="image" tref="https://example.com/wms?BBOX={xmin},{ymin},{xmax},{ymax}&amp;WIDTH={w}&amp;HEIGHT={h}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

</details>

### Media query

The `media` attribute accepts a 
[map media query](https://maps4html.org/web-map-doc/docs/api/mapml-viewer-api#supported-map-media-query-features). 
When specified, the layer is active only when the query matches the current map state (e.g. the map zoom corresponds to 
a specified range), and disabled otherwise.  Try zooming in past zoom level 6 to see the overlay layer 
(and consequently, the layer control) disappear.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}" checked hidden></map-layer>
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/current_conditions' | url }}" checked media="(0 <= map-zoom <= 6)"></map-layer>
</gcds-map>

<details>
<summary>Show code</summary>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="basemap.mapml" checked hidden></map-layer>
  <map-layer src="overlay.mapml" checked media="(0 <= map-zoom <= 6)"></map-layer>
</gcds-map>
```

</details>

### Combining remote and inline layers

A map can contain a mix of remote and inline layers. Here a hidden basemap and a
remote thematic overlay are combined with an inline point feature layer.

<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}" checked hidden></map-layer>
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/current_conditions' | url }}" checked opacity="0.7"></map-layer>
  <map-layer label="Points of Interest" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=10"></map-meta>
    <map-feature zoom="4">
      <map-featurecaption>Ottawa</map-featurecaption>
      <map-properties>
        <h2>Ottawa</h2>
        <p>Capital of Canada</p>
      </map-properties>
      <map-geometry cs="gcrs">
        <map-point>
          <map-coordinates>-75.6972 45.4215</map-coordinates>
        </map-point>
      </map-geometry>
    </map-feature>
  </map-layer>
</gcds-map>

<details>
<summary>Show code</summary>

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="basemap.mapml" checked hidden></map-layer>
  <map-layer src="overlay.mapml" checked opacity="0.7"></map-layer>
  <map-layer label="Points of Interest" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=10"></map-meta>
    <map-feature zoom="4">
      <map-featurecaption>Ottawa</map-featurecaption>
      <map-properties>
        <h2>Ottawa</h2>
        <p>Capital of Canada</p>
      </map-properties>
      <map-geometry cs="gcrs">
        <map-point>
          <map-coordinates>-75.6972 45.4215</map-coordinates>
        </map-point>
      </map-geometry>
    </map-feature>
  </map-layer>
</gcds-map>
```

</details>

## Code builder

{% include "partials/getcode.njk" %}

<iframe
  title="map-layer code builder with properties and events."
  src="http://localhost:6006/iframe.html?id=components-layer--events-properties&viewMode=docs&demo=true&singleStory=true&lang=en"
  width="1200"
  height="100"
  style="display: block; margin: 0 auto; border: 0; overflow: hidden;"
  scrolling="no"
  frameBorder="0"
  allow="clipboard-write"></iframe>

<script>
  window.addEventListener('message', (ev) => {
    if (ev.data && ev.data.type === 'storybook-resize' && ev.data.src) {
      const reportedId = new URL(ev.data.src).searchParams.get('id');
      document.querySelectorAll('iframe').forEach((iframe) => {
        try {
          const iframeId = new URL(iframe.src).searchParams.get('id');
          if (reportedId && reportedId === iframeId) {
            iframe.style.height = ev.data.height + 'px';
          }
        } catch(e) {}
      });
    }
  });
</script>

