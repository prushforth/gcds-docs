---
title: Layer
layout: 'layouts/component-documentation.njk'
loadGcdsMap: true
translationKey: 'maplayerDesign'
tags: ['maplayerEN', 'design']
date: 'git Last Modified'
---

## On this page

- [Layer control anatomy](#layer-control-anatomy)
- [Design and accessibility for layers](#design-and-accessibility-for-layers)
  - [Design](#design)
    - [How layers represent map content](#how-layers-represent-map-content)
    - [Remote vs inline layer content](#remote-vs-inline-layer-content)
      - [Remote content](#remote-content)
      - [Inline content](#inline-content)
      - [Combining remote and inline layers](#combining-remote-and-inline-layers)
    - [Attribution and licensing](#attribution-and-licensing)
    - [Layers and sub-layers](#layers-and-sublayers)
    - [Alternate layer projections](#alternate-layer-projections)
    - [Legends](#legends)
    - [Map content types](#map-content-types)
        - [Image content](#images)
        - [Feature content](#features)
        - [Tiled content](#tiles)
        - [GeoJSON](#geojson)
        - [Vector tiles](#vector-tiles)
  - [Accessibility](#accessibility)
    - [Provide an accessible name for non-hidden layers](#provide-an-accessible-name-for-nonhidden-layers)
    - [Hide map content that is not relevant using map media queries](#hide-map-content-that-is-not-relevant-using-map-media-queries)
    - [Ensure visual content has enough contrast](#ensure-visual-content-has-enough-contrast)
      - [Alternate layer styles](#alternate-layer-styles)

## Layer control anatomy
<ol class="anatomy-list">

  <li>Each layer entry can be turned on or off by the user, using the layer <strong>checkbox</strong>. Interactive changes to the checkbox cause the <code>&lt;map-layer&gt;</code> element to emit the <code>map-change</code> event. The <code>&lt;map-layer checked&gt;</code> boolean attribute can be set or unset to control the layer's initial state, and the element's property can also be updated using JavaScript to effect the layer's state (on or off). Changes made to the <code>checked</code> property or attribute by JavaScript do not cause the <code>&lt;map-layer&gt;</code> element to emit <code>map-change</code> events.

  <li>The layer <strong>Title or Label</strong> is the layer's accessible name for presentation to users.  If the 
  <code>&lt;map-layer&gt;</code> element has a <code>src</code> attribute, the layer is a "remote" content layer.  
  Remote content may be 3rd party content, and as such its author has the right or obligation to set the 
  content's accessible name, via a <code>&lt;map-title&gt;</code> element.  If no <code>&lt;map-title&gt;</code> element is present, the name of the layer can be set with the <code>&lt;map-layer label=" "&gt;</code> attribute.  Regardless of whether the layer content is remote or inline (i.e. between the begin and end tags of the <code>&lt;map-layer&gt;inline markup and content&lt;/map-layer&gt;</code>), a descendent <code>&lt;map-title&gt;</code> element takes precedence over the <code>&lt;map-layer label=" "</code> attribute.

  <li>The layer <strong>delete</strong> button permanently removes the layer from the document. The only way to restore a deleted layer is to re-load the original page.  Activating the delete button removes the corresponding <code>&lt;map-layer&gt;</code> element and its children from the document.

  <li>A <code>&lt;map-extent&gt;</code> element is represented in the layer control as a sub-layer of its ancestor <code>&lt;map-layer&gt;</code> element, and the sub-layer's accessible name is provided by its <code>&lt;map-extent label="Name Goes Here"&gt;</code> <code>label</code> attribute.  If no <code>label</code> attribute is provided, the sub-layer is named "Sub-layer" by default.  A sub-layer does not have to be presented 
  in the layer control, as it can be hidden via an optional .  Like layers, sub-layers are controlled via the <code>hidden</code> and <code>checked</code> boolean attributes.

  <li>For layers and sub-layers, settings information is accessed by the <strong>Settings</strong> button, and reveals labels and controls for content. The layer or sub-layer settings button is a type of disclosure widget, 
  with a different user interface.

  <li>Layer control entries use standard HTML<strong>disclosure widgets</strong> to present layer or sub-layer summary information while revealing details, including content controls, upon user interaction.  

  <li>Layers and sub-layers have independent <strong>opacity</strong> slider controls.  The opacity slider 
  renders and represents a numeric <code>&lt;map-layer&gt;</code> or <code>&lt;map-extent&gt;</code> <code>opacity</code> attribute value between 0 and 1.

  <li>Layer styles are rendered as <strong>style</strong> selectors.  Layer styles can be used to manage 
  cartographic themes, light/dark equivalents and high-contrast layers, among other accessibility objectives.  
  Layer styles were designed to make WMS named styles accessible, but are a general-purpose mechanism to enable
  user choice among alternates, including completed different content sources for the same geographic area 
  e.g. satellite vs map view.
  
  <li>Sub-layer dimensions such as time, reference time, and elevation (which are standard Web Map Service (WMS) dimensions) are rendered and interactively selectable as HTML <code>select</code> elements.

</ol>

<img id="anatomy" src="/images/en/components/anatomy/gcds-layer-control-anatomy.svg" alt="An image of the anatomy." >

## Design and accessibility for layers

### Design

#### How layers represent map content

The <code>&lt;map-layer&gt;</code> element's content is rendered on the map as images, tiles and features 
and it's metadata is rendered in the layer control as text and controls.  The layer control expands on hover or keyboard activation. The expanded layer control renders the layers of the map as a 
list of entries, with the keyboard tab order equal to the source 
<code>&lt;map-layer&gt;</code> elements' document order.  Each layer control entry has a standard anatomy.

#### Remote vs inline layer content

##### Remote content

A remote layer fetches its content from a MapML document URL, pointed to by the
`<map-layer src="...">` `src` attribute. The MapML document is parsed as XHTML, using the browser's
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

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer src="https://example.com/path/to/layer.mapml" checked></map-layer>
</gcds-map>
```

##### Inline content

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

```html
<gcds-map lat="45.5" lon="-74.5" zoom="3" projection="CBMTILE" controls>
  <!-- the content of this layer is "inline" -->
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

##### Combining remote and inline layers

A map can contain a mix of remote and inline layers. Here a hidden basemap and a
remote thematic overlay are combined with an inline point feature layer.

<gcds-map lat="45.4215" lon="-75.6972" zoom="4" projection="OSMTILE" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/cbmt' | url }}" checked hidden></map-layer>
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/current_conditions' | url }}" checked opacity="0.7"></map-layer>
  <map-layer label="Points of Interest" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=10"></map-meta>
    <map-feature zoom="8">
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

```html
<gcds-map lat="45.4215" lon="-75.6972" zoom="4" projection="OSMTILE" controls>
  <map-layer src="basemap.mapml" checked hidden></map-layer>
  <map-layer src="overlay.mapml" checked opacity="0.7"></map-layer>
  <map-layer label="Points of Interest" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-meta name="zoom" content="min=0,max=10"></map-meta>
    <map-feature zoom="8">
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

#### Attribution and licensing

The map component displays the collapsed attribution button in the bottom right
corner.  When activated, the attribution control displays a keyboard help menu, followed
by focusable links to attribution and licensing information for all layers on the map.

Licensing or attribution links are optionally included in layer content (remote or inline), 
as <code>&lt;map-link <strong>rel="license"</strong>&gt;</code> links, where the <code>rel</code> 
attribute value <code>license</code> signifies that the link should be included in the 
attribution control.  Licensing or attribution links are optional, however including them is
highly recommended, especially if your map uses 3rd party content for which attribution is
independently required, such as in the example below.

<gcds-map projection="OSMTILE" zoom="0" lat="0" lon="0" controls style="height: 400px;">
  <map-layer label="OpenStreetMap" checked>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright" title="&#xa9; OpenStreetMap contributors CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="OSMTILE" zoom="0" lat="0" lon="0" controls>
  <map-layer label="OpenStreetMap" checked>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright" title="&#xa9; OpenStreetMap contributors CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

#### Layers and sub-layers

The `<map-layer>` element can include the `<map-extent>` element, which acts as a template for fetching and including map content. The 
 `<map-extent>` element is treated as a layer control-visible "sub-layer", accessible to the user via the layer's settings button.  Each
 sub-layer can have its own accessible name, assigned via `<map-extent label="...">`  attribute.  If no `label` is provided, it is assigned "Sub-layer" as a default value.  Sub-layers may also be hidden via the boolean `hidden` attribute if desired.  Note that hiding such user interface
 elements may affect the usability of the content, depending on its nature. In the example below,
 including the sub-layer in the map UI (by not adding a `hidden` attribute) decreases usability by increasing the cognitive load on the user, because they have to understand what the sub-layer is for and why it's called "Sub-layer".  That could have been avoided by simply including the `<map-extent hidden>` attribute.

<gcds-map projection="CBMTILE" zoom="2" lat="63" lon="-89" controls static style="height: 400px;">
  <map-layer label="Toporama" checked>
      <map-link rel="license"
      href="https://open.canada.ca/en/open-government-licence-canada"
      title="Open Government Licence - Canada"></map-link> 
    <!-- including the hidden attribute here would make the UI simpler -->
    <map-extent units="CBMTILE" checked>
      <map-input name="z" type="zoom" value="19" min="0" max="19"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_en?SERVICE=WMS&amp;REQUEST=GetMap&amp;FORMAT=image/jpeg&amp;TRANSPARENT=FALSE&amp;STYLES=&amp;VERSION=1.3.0&amp;LAYERS=WMS-Toporama&amp;WIDTH={w}&amp;HEIGHT={h}&amp;CRS=EPSG:3978&amp;BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="CBMTILE" zoom="2" lat="63" lon="-89" controls static style="height: 400px;">
  <map-layer label="Toporama" checked> 
    <!-- including the hidden attribute here would make the UI simpler -->
    <map-extent units="CBMTILE" checked>
      <map-input name="z" type="zoom" value="19" min="0" max="19"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_en?SERVICE=WMS&amp;REQUEST=GetMap&amp;FORMAT=image/jpeg&amp;TRANSPARENT=FALSE&amp;STYLES=&amp;VERSION=1.3.0&amp;LAYERS=WMS-Toporama&amp;WIDTH={w}&amp;HEIGHT={h}&amp;CRS=EPSG:3978&amp;BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

#### Alternate layer projections

All maps have a fundamental mathematical characteristic that allows the curved, three dimensional surface of
the Earth to be drawn in the two dimensions of the screen: their "projection".  Map projection is the term used to 
identify the class of transformation that enables this rendering, and the projection may 
vary from map to map, depending on its purpose. For example, maps of the Earth's poles may require a different 
approach than a map of North or South America.

In MapML, the projection of a map is identified by its `projection` attribute value. Content that is displayed
on that map **must** conform to that projection otherwise its rendering may be slightly 
or completely inaccurate.  MapML maps don't perform compute-intensive reprojection of map data "on the fly"; 
MapML maps use "projection negotiation", in which the layer author may choose to provide and advertise
alternate representations of layer content by projection, and the client map selects the layer representation that best fits.

<details>
<summary style="margin-block-end: var(--gcds-heading-spacing-200);">Projection negotiation - inline content</summary>

In this example, inline content provides two hidden sub-layers, each with a different `projection`.  The provided button 
toggles the `projection` of the map between `CBMTILE` and `OSMTILE`.  The map selects and displays the sub-layer that matches its projection. 

<div style="position: relative;">
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
  <map-layer label="Toporama" checked>
    <map-link rel="license"
      href="https://open.canada.ca/en/open-government-licence-canada"
      title="Open Government Licence - Canada"></map-link> 
    <map-extent units="CBMTILE" checked hidden>
      <map-input name="z" type="zoom" value="19" min="0" max="19"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_en?SERVICE=WMS&amp;REQUEST=GetMap&amp;FORMAT=image/jpeg&amp;TRANSPARENT=FALSE&amp;STYLES=&amp;VERSION=1.3.0&amp;LAYERS=WMS-Toporama&amp;WIDTH={w}&amp;HEIGHT={h}&amp;CRS=EPSG:3978&amp;BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
    </map-extent>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" value="18" min="2" max="18"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-1.88830035E7" max="-1917652.2"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="2700367.3" max="2.04484338E7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-1.88830035E7" max="-1917652.2"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="2700367.3" max="2.04484338E7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_en?SERVICE=WMS&amp;REQUEST=GetMap&amp;FORMAT=image/jpeg&amp;TRANSPARENT=FALSE&amp;STYLES=&amp;VERSION=1.3.0&amp;LAYERS=WMS-Toporama&amp;WIDTH={w}&amp;HEIGHT={h}&amp;CRS=EPSG:3857&amp;BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
<gcds-button size="small" style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); z-index: 1000;" onclick="const m=this.parentElement.querySelector('gcds-map');const n=m.getAttribute('projection')==='CBMTILE'?'OSMTILE':'CBMTILE';m.setAttribute('projection',n);this.textContent=n==='CBMTILE'?'Mercator Projection':'Lambert Projection';">Mercator Projection</gcds-button>
</div>

```html
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
  <map-layer label="Toporama" checked>
    <map-link rel="license"
      href="https://open.canada.ca/en/open-government-licence-canada"
      title="Open Government Licence - Canada"></map-link>
    <map-extent units="CBMTILE" checked hidden>
      <map-input name="z" type="zoom" value="19" min="0" max="19"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-2465257.3" max="3078646.8"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-883189.1" max="3952792.7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_en?SERVICE=WMS&amp;REQUEST=GetMap&amp;FORMAT=image/jpeg&amp;TRANSPARENT=FALSE&amp;STYLES=&amp;VERSION=1.3.0&amp;LAYERS=WMS-Toporama&amp;WIDTH={w}&amp;HEIGHT={h}&amp;CRS=EPSG:3978&amp;BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
    </map-extent>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" value="18" min="2" max="18"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-1.88830035E7" max="-1917652.2"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="2700367.3" max="2.04484338E7"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-1.88830035E7" max="-1917652.2"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="2700367.3" max="2.04484338E7"></map-input>
      <map-link rel="image" tref="https://maps.geogratis.gc.ca/wms/toporama_en?SERVICE=WMS&amp;REQUEST=GetMap&amp;FORMAT=image/jpeg&amp;TRANSPARENT=FALSE&amp;STYLES=&amp;VERSION=1.3.0&amp;LAYERS=WMS-Toporama&amp;WIDTH={w}&amp;HEIGHT={h}&amp;CRS=EPSG:3857&amp;BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
    </map-extent>
  </map-layer>
```

</details>

<details open>
<summary style="margin-block-end: var(--gcds-heading-spacing-200);">Projection negotiation - remote content</summary>

In this example, the map includes a single layer that links to a MapML resource in the same projection as the initial map.
That MapML document includes a `<map-link>` element linking to its complementary projection resource.  When the user 
toggles the map `projection` between `CBMTILE` and `OSMTILE`, the map selects and displays the complementary compatible
MapML document.

<div style="position: relative;">
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
  <map-layer label="Toporama" checked src="../assets/cbmtile/toporama.mapml"></map-layer>
</gcds-map>
<gcds-button size="small" style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); z-index: 1000;" onclick="const m=this.parentElement.querySelector('gcds-map');const n=m.getAttribute('projection')==='CBMTILE'?'OSMTILE':'CBMTILE';m.setAttribute('projection',n);this.textContent=n==='CBMTILE'?'Mercator Projection':'Lambert Projection';">Mercator Projection</gcds-button>
</div>

```html
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
   <map-layer label="Toporama" checked src="../assets/cbmtile/toporama.mapml"></map-layer>
</gcds-map>
```

</details>


#### Legends

A legend can provide a description of the meaning of the symbols used by a layer. The first `<map-link rel="legend" href>`
attribute value is provided as a link from the layer name in the layer control. Be aware that if the legend is provided as an image,
the image may be somewhat or completely inaccessible to users with visual disabilities.  A more accessible 
approach might be to provide an HTML page with text desriptions of associated symbols, but even this might not make a map layer 
completely accessible.

<gcds-map projection="CBMTILE" zoom="2" lat="63.0" lon="-98.8" controls style="height: 400px;">
  <map-layer hidden label="Basemap" checked src="../assets/cbmtile/toporama.mapml"></map-layer>
  <map-layer label="Buildup Index 2026-06-26" checked>
    <map-meta name="extent"
      content="top-left-easting=-2378164.081065, top-left-northing=3854382.228876003, bottom-right-easting=3039835.918935, bottom-right-northing=-707617.7711239969"></map-meta>
    <map-link rel="legend"
      href="../assets/legend.html"
      title="Buildup Index"></map-link>
    <map-extent units="CBMTILE" checked="">
      <map-input name="xmin" type="location" position="top-left" axis="easting" units="pcrs"></map-input>
      <map-input name="ymin" type="location" position="bottom-left" axis="northing" units="pcrs"></map-input>
      <map-input name="xmax" type="location" position="bottom-right" axis="easting" units="pcrs"></map-input>
      <map-input name="ymax" type="location" position="top-right" axis="northing" units="pcrs"></map-input>
      <map-input name="w" type="width" min="1" max="10000"></map-input>
      <map-input name="h" type="height" min="1" max="10000"></map-input>
      <map-input name="i" type="location" axis="i" units="map"></map-input>
      <map-input name="j" type="location" axis="j" units="map"></map-input>
      <map-link rel="image"
        tref="https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=bui&WIDTH={w}&HEIGHT={h}&FORMAT=image%2Fpng&TRANSPARENT=TRUE&STYLES=cffdrs_bui_cbf&TIME=2026-06-26T00:00:00.000Z&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
      <map-link rel="query" 
        tref="https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=bui&QUERY_LAYERS=bui&WIDTH={w}&HEIGHT={h}&FORMAT=image%2Fpng&TRANSPARENT=TRUE&INFO_FORMAT=application%2Fjson&STYLES=cffdrs_bui_cbf&TIME=2026-06-26T00:00:00.000Z&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}&I={i}&J={j}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="CBMTILE" zoom="3" lat="57" lon="-95" controls style="height: 400px;">
  <map-layer hidden label="Basemap" checked src="../assets/cbmtile/toporama.mapml"></map-layer>
  <map-layer label="Buildup Index 2026-06-26" checked>
    <map-meta name="extent"
      content="top-left-easting=-2378164.081065, top-left-northing=3854382.228876003, bottom-right-easting=3039835.918935, bottom-right-northing=-707617.7711239969"></map-meta>
    <map-link rel="legend"
      href="../assets/legend.html"
      title="Buildup Index"></map-link>
    <map-extent units="CBMTILE" checked="">
      <map-input name="xmin" type="location" position="top-left" axis="easting" units="pcrs"></map-input>
      <map-input name="ymin" type="location" position="bottom-left" axis="northing" units="pcrs"></map-input>
      <map-input name="xmax" type="location" position="bottom-right" axis="easting" units="pcrs"></map-input>
      <map-input name="ymax" type="location" position="top-right" axis="northing" units="pcrs"></map-input>
      <map-input name="w" type="width" min="1" max="10000"></map-input>
      <map-input name="h" type="height" min="1" max="10000"></map-input>
      <map-input name="i" type="location" axis="i" units="map"></map-input>
      <map-input name="j" type="location" axis="j" units="map"></map-input>
      <map-link rel="image"
        tref="https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=bui&WIDTH={w}&HEIGHT={h}&FORMAT=image%2Fpng&TRANSPARENT=TRUE&STYLES=cffdrs_bui_cbf&TIME=2026-06-26T00:00:00.000Z&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}"></map-link>
      <map-link rel="query" 
        tref="https://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=bui&QUERY_LAYERS=bui&WIDTH={w}&HEIGHT={h}&FORMAT=image%2Fpng&TRANSPARENT=TRUE&INFO_FORMAT=application%2Fjson&STYLES=cffdrs_bui_cbf&TIME=2026-06-26T00:00:00.000Z&CRS=EPSG:3978&BBOX={xmin},{ymin},{xmax},{ymax}&I={i}&J={j}"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

#### Map content types

##### Images

A layer can contain `<map-extent>` elements that define templated whole-viewport requests for images (or features, or tiles), 
fetched dynamically as the user pans and zooms the map.

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

```html
<gcds-map lat="53.087426" lon="-91.27533" zoom="4" projection="OSMTILE" controls>
  <map-layer label="CBMT (inline extent)" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <!-- the bounds of an image or tile request is described by the form-like map-extent element -->
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

##### Features

Geographic information is modelled as points, lines or polygons, and the standard geometry model shared across 
most subject matter domains is called the "Simple Features" (SF) model, from the Open Geospatial Consortium (OGC).
The SF model combines feature named text properties with a standardized shape property named "geometry". Many
formats apply the SF model in the format's own syntax, such as GeoJSON, KML, Shapefiles and many others.

MapML applies the SF model in the `<map-feature>` element, which can be used in remote and inline content.

<gcds-map projection="OSMTILE" zoom="11" lat="45.4187" lon="-75.692" controls style="height: 400px;">
  <map-layer checked hidden>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright" title="&#xa9; OpenStreetMap contributors CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
  <map-layer label="Features" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-style>
      .polygon {
        fill: #80C2AF;
        stroke: #1167b1;
      }
      .line {
        stroke: #dc143c;
      }
      .point {
        fill: #D8A47F;
        stroke: #EF8354;
      }
    </map-style>
    <map-feature>
      <map-featurecaption>Polygon</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-polygon class="polygon">
          <map-coordinates>-75.5859375 45.4656690 -75.6813812 45.4533876 -75.6961441 45.4239978 -75.7249832 45.4083331 -75.7792282 45.3772317 -75.7534790 45.3294614 -75.5831909 45.3815724 -75.6024170 45.4273712 -75.5673981 45.4639834 -75.5859375 45.4656690</map-coordinates>
        </map-polygon>
      </map-geometry>
      <map-properties><h2>This is a Polygon</h2></map-properties>
    </map-feature>
    <map-feature>
      <map-featurecaption>Line</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-linestring class="line">
          <map-coordinates>-75.6168365 45.471929 -75.6855011 45.458445 -75.7016373 45.4391764 -75.7030106 45.4259255 -75.7236099 45.4208652 -75.7565689 45.4117074 -75.7833481 45.384225 -75.8197403 45.3714435 -75.8516693 45.377714</map-coordinates>
        </map-linestring>
      </map-geometry>
      <map-properties><h2>This is a Line</h2></map-properties>
    </map-feature>
    <map-feature>
      <map-featurecaption>Point</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-point class="point">
          <map-coordinates>-75.6916809 45.4186964</map-coordinates>
        </map-point>
      </map-geometry>
      <map-properties><h2>This is a Point</h2></map-properties>
    </map-feature>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="OSMTILE" zoom="11" lat="45.4187" lon="-75.692" controls>
  <map-layer label="Features" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-feature>
      <map-featurecaption>Polygon</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-polygon class="polygon">
          <map-coordinates>-75.5859375 45.4656690 -75.6813812 45.4533876 -75.6961441 45.4239978 -75.7249832 45.4083331 -75.7792282 45.3772317 -75.7534790 45.3294614 -75.5831909 45.3815724 -75.6024170 45.4273712 -75.5673981 45.4639834 -75.5859375 45.4656690</map-coordinates>
        </map-polygon>
      </map-geometry>
      <map-properties><h2>This is a Polygon</h2></map-properties>
    </map-feature>
    <map-feature>
      <map-featurecaption>Line</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-linestring class="line">
          <map-coordinates>-75.6168365 45.471929 -75.6855011 45.458445 -75.7016373 45.4391764 -75.7030106 45.4259255 -75.7236099 45.4208652 -75.7565689 45.4117074 -75.7833481 45.384225 -75.8197403 45.3714435 -75.8516693 45.377714</map-coordinates>
        </map-linestring>
      </map-geometry>
      <map-properties><h2>This is a Line</h2></map-properties>
    </map-feature>
    <map-feature>
      <map-featurecaption>Point</map-featurecaption>
      <map-geometry cs="gcrs">
        <map-point class="point">
          <map-coordinates>-75.6916809 45.4186964</map-coordinates>
        </map-point>
      </map-geometry>
      <map-properties><h2>This is a Point</h2></map-properties>
    </map-feature>
  </map-layer>
</gcds-map>
```

##### Tiles

Tiled geographic data is an optimization created to support the stateless resource architecture of the web. 
Tiles allow spatial information to be efficiently transmitted, cached and rendered. Tiles can contain 
different types of geographic content, including images and feature data, and may be encoded in different formats. 
Tiles are often, but not always created in projected units according to a regular well-known nested grid structure. 
MapML embeds these well-known grid structures into its coordinate systems, and gives each system a well-known identifier. 
The identifiers are used in the map's `projection` and related attributes.

Most commonly, tiles are implicitly referenced in bulk, via the MapML URL templating system implemented by the
`<map-extent>` content model.  Although it is usually not explicitly encoded in markup, it is possible to include 
individual `<map-tile>` elements in content, and they behave like a "square feature" rendered at a single map
zoom level value.

<gcds-map projection="OSMTILE" zoom="11" lat="45.4187" lon="-75.692" controls style="height: 400px;">
  <map-layer label="OpenStreetMap templated tiles" checked>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright" title="OpenStreetMap &#xa9; contributors CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
  <map-layer label="Individual tiles" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-meta name="zoom" content="min=11,max=11"></map-meta>
    <map-link rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" title="Kitten tiles by Wikipedia - CC BY-SA 4.0"></map-link>
    <map-tile zoom="11" row="732" col="591" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gray_and_White_Kitten_%288571437977%29.jpg/250px-Gray_and_White_Kitten_%288571437977%29.jpg"></map-tile>
    <map-tile zoom="11" row="732" col="592" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/1280px-Juvenile_Ragdoll.jpg"></map-tile>
    <map-tile zoom="11" row="732" col="593" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Kitten_%2814297415856%29.jpg/250px-Kitten_%2814297415856%29.jpg"></map-tile>
    <map-tile zoom="11" row="732" col="594" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Tabby_Kitten_on_Blue_Throw.jpg/250px-Tabby_Kitten_on_Blue_Throw.jpg"></map-tile>
    <map-tile zoom="11" row="733" col="591" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gray_and_White_Kitten_%288571437977%29.jpg/250px-Gray_and_White_Kitten_%288571437977%29.jpg"></map-tile>
    <map-tile zoom="11" row="733" col="592" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Tabby_Kitten_on_Blue_Throw.jpg/250px-Tabby_Kitten_on_Blue_Throw.jpg"></map-tile>
    <map-tile zoom="11" row="733" col="593" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/1280px-Juvenile_Ragdoll.jpg"></map-tile>
    <map-tile zoom="11" row="733" col="594" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Kitten_%2814297415856%29.jpg/250px-Kitten_%2814297415856%29.jpg"></map-tile>
    <map-tile zoom="11" row="734" col="591" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gray_and_White_Kitten_%288571437977%29.jpg/250px-Gray_and_White_Kitten_%288571437977%29.jpg"></map-tile>
    <map-tile zoom="11" row="734" col="592" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/1280px-Juvenile_Ragdoll.jpg"></map-tile>
    <map-tile zoom="11" row="734" col="593" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Kitten_%2814297415856%29.jpg/250px-Kitten_%2814297415856%29.jpg"></map-tile>
    <map-tile zoom="11" row="734" col="594" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Tabby_Kitten_on_Blue_Throw.jpg/250px-Tabby_Kitten_on_Blue_Throw.jpg"></map-tile>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="OSMTILE" zoom="11" lat="45.4187" lon="-75.692" controls style="height: 400px;">
  <map-layer label="OpenStreetMap templated tiles" checked>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright" title="&#xa9; OpenStreetMap contributors CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
  <map-layer label="Individual tiles" checked>
    <map-meta name="projection" content="OSMTILE"></map-meta>
    <map-meta name="zoom" content="min=11,max=11"></map-meta>
    <map-link rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" title="By Leijurv, NOESCATS - Own work, CC BY-SA 4.0"></map-link>
    <map-tile zoom="11" row="733" col="593" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/1280px-Juvenile_Ragdoll.jpg"></map-tile>
    <map-tile zoom="11" row="733" col="594" src="https://upload.wikimedia.org/wikipedia/commons/4/42/1_dia_de_vida.jpg"></map-tile>
  </map-layer>
</gcds-map>
```

##### GeoJSON

GeoJSON is a useful and widespread format that applies the Simple Features model in JSON.  GeoJSON is limited to 
CRS:84 (longituded, latitude) coordinates based on the Global Positioning System framework. This constrains the 
interoperability of GeoJSON mostly to situations where the CRS:84 system is used. Fortunately, the near ubiquitous 
use of OSMTILE is compatible with GeoJSON, and this is supported by the GCDS map and layer component API.

The GeoJSON API is comprised of the `mapml2geojson()` and `geojson2mapml()` functions.

The example below loads [canada.json]({{ '/components/gcds-map/dist/gcds-map/assets/canada.json' | url }}) (a `FeatureCollection` of Canada's provinces and territories) and converts it to a 
`<map-layer>` at runtime using the map's `geojson2mapml()` method. The method accepts the parsed GeoJSON and an options object 
(`label`, `caption`, `projection`, `properties`, `geometryFunction`) and appends the resulting layer to the map for you.

<gcds-map id="provinces-geojson-map" data-static-code lat="71" lon="-96" zoom="2" projection="OSMTILE" controls style="height: 400px;">
  <map-caption>Provinces and territories of Canada, loaded from GeoJSON.</map-caption>
  <map-layer src="../assets/osmtile/cbmt.mapml" checked></map-layer>
</gcds-map>

```html
<gcds-map id="provinces-geojson-map" lat="71" lon="-96" zoom="2" projection="OSMTILE" controls style="height: 400px;">
  <map-caption>Provinces and territories of Canada, loaded from GeoJSON.</map-caption>
  <map-layer src="./cbmt.mapml" checked></map-layer>
</gcds-map>
<script>
  customElements.whenDefined('gcds-map').then(async () => {
    const mapEl = document.getElementById('provinces-geojson-map');
    await mapEl.whenReady();
    const response = await fetch('./canada.json');
    const geojson = await response.json();
    mapEl.geojson2mapml(geojson, {
      label: 'Provinces and Territories of Canada',
      caption: 'PRENAME',
    });
  });
</script>
```

<script>
  (function () {
    customElements.whenDefined('gcds-map').then(async function () {
      const mapEl = document.getElementById('provinces-geojson-map');
      await mapEl.whenReady();
      const response = await fetch('{{ '/components/gcds-map/dist/gcds-map/assets/canada.json' | url }}');
      const geojson = await response.json();
      mapEl.geojson2mapml(geojson, {
        label: 'Provinces and Territories of Canada',
        caption: 'PRENAME',
      });
    });
  })();
</script>

##### Vector tiles

The layer component supports Mapbox Vector Tiles (mvt) and the [pmtiles archive format](https://docs.protomaps.com/pmtiles/). 
A vector tile `<map-link>` must be paired with a stylesheet module — see 
[creating mvt styles](https://maps4html.org/web-map-doc/docs/user-guide/creating-styles) and 
[using mvt styles](https://maps4html.org/web-map-doc/docs/user-guide/using-styles) for the authoring reference.

The example below loads a public [OpenStreetMap pmtiles archive](https://data.source.coop/protomaps/openstreetmap/tiles/v3.pmtiles). 
Use the layer settings to switch between the bundled light and dark themes.

<gcds-map projection="OSMTILE" zoom="1" lat="35.5" lon="-5.24" controls style="height: 400px;">
  <map-layer src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/light.mapml' | url }}" checked></map-layer>
</gcds-map>

```html
<gcds-map projection="OSMTILE" zoom="1" lat="35.5" lon="-5.24" controls style="height: 400px;">
  <map-layer src="./light.mapml" checked></map-layer>
</gcds-map>
```


### Accessibility

#### Provide an accessible name for non-hidden layers

The <code>&lt;map-layer&gt;</code> element may seem like a purely visual element that only adds to the stack 
of content rendered in the map viewport in document order, and while true, it is also true that layer content 
is made accessible to users through inclusion of layer metadata in the layer control.

If a layer is important enough, it should have a meaningful name available to all users.  If a layer contains 
a child `<map-title>Accessible names are descriptive</map-title>` element, that element's text value 
("Accessible names are descriptive") is <strong>always</strong> used for the layer control name, 
overriding any `label`; if the layer lacks a `<map-title>` element, the layer control name falls back to the 
`<map-layer label="This is used if no child map-title element exists">` `label` attribute value, if provided. 
If neither of those values is provided, the layer control name of the layer is set to "Layer", which is not 
very helpful to users.  Consequently, it's important to ensure that your layers have an 
[accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name).

The accessible name of the whole map is provided by a map's child <code>&lt;map-caption&gt;</code> element.

<gcds-map zoom="14" lat="43.193477" lon="-80.384773" controls style="height: 400px;">
  <map-caption>Paris, Ontario</map-caption>
  <map-layer label="I am your father, Luke" checked>
    <map-title>OpenStreetMap</map-title>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright" title="&#xa9; OpenStreetMap contributors CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>

```html
<gcds-map projection="OSMTILE" zoom="14" lat="43.193477" lon="-80.384773" controls style="height: 400px;">
  <map-caption>Paris, Ontario</map-caption>
  <map-layer label="I am your father, Luke" checked>
    <map-title>OpenStreetMap</map-title>
    <map-link rel="license" href="https://www.openstreetmap.org/copyright" title="&#xa9; OpenStreetMap contributors CC BY-SA 2.0"></map-link>
    <map-extent units="OSMTILE" checked hidden>
      <map-input name="z" type="zoom" min="0" max="18"></map-input>
      <map-input name="x" type="location" units="tilematrix" axis="column"></map-input>
      <map-input name="y" type="location" units="tilematrix" axis="row"></map-input>
      <map-link rel="tile" tref="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></map-link>
    </map-extent>
  </map-layer>
</gcds-map>
```

#### Hide map content that is not relevant using map media queries

If certain map content is not relevant depending on [conditions that can be identified by map media expressions](https://maps4html.org/web-map-doc/docs/api/mapml-viewer-api#supported-map-media-query-features),
organize the content into distinct `<map-layer>` elements, and use the `media` attribute to show or hide
the layer accordingly.  For example, users may enable "dark mode" on their system.  A map media query can
identify such a condition and enable or disable content that conforms to one mode or the other accordingly.

The example below pairs two complementary pmtiles vector layers — the same 
[OpenStreetMap pmtiles archive](https://data.source.coop/protomaps/openstreetmap/tiles/v3.pmtiles) 
rendered with a light theme and a dark theme. Each `<map-layer>` declares a `media` attribute 
with a `prefers-color-scheme` query, so only the layer matching the user's current OS / browser 
colour-scheme preference is active. Toggle your system between light and dark mode to see the map 
swap automatically.

<gcds-map projection="OSMTILE" zoom="1" lat="35.5" lon="-5.24" controls style="height: 400px;">
  <map-layer media="(prefers-color-scheme: light)" checked src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/light.mapml' | url }}"></map-layer>
  <map-layer media="(prefers-color-scheme:  dark)" checked src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/osmtile/dark.mapml' | url }}"></map-layer>
</gcds-map>

```html
<gcds-map projection="OSMTILE" zoom="1" lat="35.5" lon="-5.24" controls style="height: 400px;">
  <map-layer media="(prefers-color-scheme: light)" checked src="./light.mapml"></map-layer>
  <map-layer media="(prefers-color-scheme:  dark)" checked src="./dark.mapml"></map-layer>
</gcds-map>
```

#### Ensure visual content has enough contrast

Don't rely on colour alone to disinguish map features.  Use high colour contrast, and different shapes and symbology 
where possible. Your organization may not always own the data your map presents, but providing accessibility 
feedback to map providers is helpful to all users.  

In general, leave the opacity or transparency of layers up to the user.

##### Alternate layer styles

Web Map Service (WMS) layers may be provided in a variety of named styles, each according to its own legend of different symbology. 
Different styles for a given WMS layer are typically accessed by providing the name of the style as a map request URL parameter. 
<code>&lt;map-layer&gt;</code>s can help make WMS named styles user-accessible, by linking to different the styles for embedded WMS 
layers.  These links are presented in the layer control as radio control options for the layer, with each option labeled with the 
accessible name (<code>title</code> attribute) of the corresponding link.  Such links may be to different styles for a given data 
source (e.g. a WMS layer), but they may point to anything, including different data sources e.g. "Satellite view" (imagery) vs 
"Map view" (rendered symbols and text for identifiable features).  It's up to the developer to determine what makes sense and is 
accessible for their users.

Named style links currently only work with remote MapML layers - that is layers with content accessed by a URL in the 
<code>&lt;map-layer <strong>src=" "</strong>&gt;</code> attribute.

In the following example, the remote document declares two <code>&lt;map-link rel="style"&gt;</code> links, 
one with <code>rel="self style"</code> indicating the currently active style, and one with <code>rel="style"</code> 
for the alternate.  Open the layer control (hover or keyboard-focus the control in the top right) and expand the layer 
settings to see and switch between the available styles.

<gcds-map projection="CBMTILE" zoom="3" lat="45.114527" lon="-59.863727" controls style="height: 400px;">
  <map-layer src="../assets/sea-surface-default.mapml" checked></map-layer>
</gcds-map>

```html
<gcds-map projection="CBMTILE" zoom="3" lat="45.114527" lon="-59.863727" controls>
  <map-layer src="../assets/sea-surface-default.mapml" checked></map-layer>
</gcds-map>
```

{% include "partials/map-live-code.njk" %}