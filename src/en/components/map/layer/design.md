---
title: Layer
layout: 'layouts/component-documentation.njk'
translationKey: 'maplayerDesign'
tags: ['maplayerEN', 'design']
date: 'git Last Modified'
---

## On this page

- [How layers represent map content](#how-layers-represent-map-content)
- [Layer control anatomy](#layer-control-anatomy)
- [Design and accessibility for layer](#design-and-accessibility-for-layer)
  - [Attribution and licensing](#attribution-and-licensing)
  - [Layer accessible name](#layer-accessible-name)
  - [Alternate layer styles](#alternate-layer-styles)
  - [Legends](#legends)
  - [Layer query popups](#layer-query-popups)
  - [Alternate layer projections](#alternate-layer-projections)
  - [Light and dark layers](#light-and-dark-layers)

### How layers represent map content

The <code>&lt;map-layer&gt;</code> element's content is rendered on the map as images, tiles and features 
and it's metadata is rendered in the layer control as text and controls.  The layer control expands on hover or keyboard 
interaction. The expanded layer control renders the layers of the map as a 
list of entries, with the keyboard tab order equal to the source 
<code>&lt;map-layer&gt;</code> elements' document order.  Each layer control entry has a standard anatomy.

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

## Design and accessibility for layer

### Attribution and licensing

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

### Layer accessible name

The <code>&lt;map-layer&gt;</code> element may seem like a purely visual element that only adds to the stack 
of content rendered in the map viewport in document order, and while true, it is also true that layer content 
is made accessible to users through inclusion of layer metadata in the layer control.

One important bit of layer metadata is its [accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name).  
While the accessible name of the whole map can be provided by a map's child <code>&lt;map-caption&gt;</code> element, 
the accessible name of an individual layer is provided either by its 
<code>&lt;map-layer <strong>label</strong>="layer accessible name goes here"&gt;</code> attribute, or by a nested or 
descendant <code>&lt;map-title&gt;</code> element within in the layer content.  If a <code>&lt;map-title&gt;</code> 
element is present, it takes precedence over, or overrides, any <code>&lt;map-layer <strong>label</strong>=" "&gt;</code> 
attribute.

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

### Alternate layer styles

Web Map Service (WMS) layers may be provided in a variety of named styles, each according to its own legend of different symbology.  Different styles for a given WMS layer are typically accessed by providing the name of the style as a map request URL parameter.  <code>&lt;map-layer&gt;</code>s can help make WMS named styles user-accessible, by linking to different the styles for embedded WMS layers.  These links are presented in the layer control as radio control options
for the layer, with each option labeled with the accessible name (<code>title</code> attribute) of the corresponding link.  Such links may be to different styles for a given data source (e.g. a WMS layer), but they may point to anything, including different data sources e.g. "Satellite view" (imagery) vs "Map view" (rendered symbols and text for identifiable features).  It's up to the developer to determine what makes sense and is accessible for their users.

Named style links currently only work with remote MapML layers - that is layers with content accessed by a URL in the <code>&lt;map-layer <strong>src=" "</strong>&gt;</code> attribute.

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

### Legends

Discuss how to create a <map-link rel="legend"> and how that is managed by gcds-map (makes a link out of the first one found).

### Layer query popups

Discuss how to make a layer "queryable". Mention the relation / analogy to WMS/WMTS layer "queryable='1'" attribute.

### Alternate layer projections

Discuss <map-link rel="alternate" projection="CBMTILE"> processing and events.

### Light and dark layers

Discuss pmtiles format?  Discuss preferences ?

{% include "partials/map-live-code.njk" %}