---
title: How to install
translationKey: startusing
layout: 'layouts/base.njk'
eleventyNavigation:
  key: startusingEN
  title: How to install
  locale: en
  order: 2
date: 'git Last Modified'
---

# How to install <code>&lt;gcds-ext-map&gt;</code>

A Government of Canada Design System (GC Design System) extension map component that provides an accessible, standards-based web map viewer using <gcds-link href="https://geo.ca/initiatives/mapml/" external>MapML</gcds-link>.

## Installation

Install and use locally:

```bash
npm install @gcds-extensions/map
```

## Verify your installation

Run:

```bash
npx http-server node_modules/@gcds-extensions/map -p 8080 -c-1
```

Open <gcds-link href="http://localhost:8080/demo/" external>http://localhost:8080/demo/</gcds-link> &mdash; you should see an interactive map.

<hr class="my-600" />

## Usage

### Basic example

Include the following script tag in your page's `<head>` to load the map component from your local `node_modules` folder:

```html
<script type="module" src="../dist/gcds-ext-map/gcds-ext-map.esm.js"></script>
```

Optionally, to use the full GC Design System component system, also include:

```html
<script type="module" src="../../../@gcds-core/components/dist/gcds/gcds.esm.js"></script>
<link rel="stylesheet" href="../../../@gcds-core/components/dist/gcds/gcds.css">
```

Then use the component in your markup (use CSS to define the width and height, since the default size is quite small):

```html
<gcds-ext-map projection="CBMTILE" lat="45.4215" lon="-75.6972" zoom="10" style="width: 60%; height: 400px">
  <map-layer checked>
    <map-title>Canada Base Map - Transportation (CBMT)</map-title>
    <map-link rel="license" href="https://open.canada.ca/en/open-government-licence-canada" title="Open Government Licence - Canada"></map-link>
    <map-link rel="suggestions" tref="https://geolocator.api.geo.ca/?q={searchTerms}&lang=en&keys=geonames"></map-link>
    <map-link rel="search" tref="https://geolocator.api.geo.ca/?q={searchTerms}&lang=en&keys=geonames"></map-link>
    <map-extent units="CBMTILE" checked hidden>
      <map-input name="z" type="zoom" value="22" min="0" max="22"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-3262924.7" max="3823954.0"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-1554977.6" max="4046262.8"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-3262924.7" max="3823954.0"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-1554977.6" max="4046262.8"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-link rel="image" tref="https://geogratis.gc.ca/maps/CBMT?SERVICE=WMS&VERSION=1.1.1&SRS=EPSG:3978&LAYERS=CBMT&BBOX={xmin},{ymin},{xmax},{ymax}&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&WIDTH={w}&HEIGHT={h}&STYLES="></map-link>
    </map-extent>
  </map-layer>
</gcds-ext-map>
```

See the [map components documentation](/en/components/map/) for further usage examples.

<hr class="my-600" />

## Using from a CDN

Alternatively, load the component directly from a CDN:

```html
<script type="module" src="https://cdn.design-system.canada.ca/@gcds-extensions/map@latest/dist/gcds-ext-map.esm.js"></script>
<link rel="stylesheet" href="https://cdn.design-system.canada.ca/@gcds-core/components@latest/dist/gcds/gcds.css">
<script type="module" src="https://cdn.design-system.canada.ca/@gcds-core/components@latest/dist/gcds/gcds.esm.js"></script>
```

<hr class="my-600" />

## Architecture

The `<gcds-ext-map>` component replaces the usage of the `<mapml-viewer>` element. See the <gcds-link href="https://maps4html.org/web-map-doc/" external>MapML documentation</gcds-link> for how to use MapML. When using GC Design System, use `<gcds-ext-map>` in place of `<mapml-viewer>` (it supports all the same attributes). All other MapML elements work as described.

`<gcds-ext-map>` and its associated MapML children are implemented as Stencil components, like other GC Design System components. `<gcds-ext-map>` is a self-contained component that renders map content in a shadow root, and does not expose slots for including content besides what is rendered on the map.

## Accessibility

The `<gcds-ext-map>` component includes several accessibility features:

<ul class="list-disc mb-300">
  <li>Keyboard navigation</li>
  <li>Screen reader support</li>
  <li>ARIA labels and descriptions</li>
  <li>Focus management</li>
</ul>

If you notice things that could be improved, please <gcds-link href="https://github.com/gcds-extensions/map/issues/new" external>open an issue</gcds-link>.

{% include "partials/needhelp.njk" %}
