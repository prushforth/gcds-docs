---
title: Layer
layout: 'layouts/component-documentation.njk'
translationKey: 'maplayerDesign'
tags: ['maplayerEN', 'design']
date: 'git Last Modified'
---

The <code>&lt;map-layer&gt;</code> element's content is rendered on the map as images, tiles and features and it's metadata is rendered in the layer control.  The layer control expands on hover or keyboard interaction. The
expanded layer control renders the layers of the map as a list of entries, with the keyboard tab order equal to 
the source <code>&lt;map-layer&gt;</code> elements' document order.  Each layer control entry has a standard anatomy.

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

<img src="/images/en/components/anatomy/gcds-layer-control-anatomy.svg" alt="An image of the anatomy." >

## Design and accessibility for layer

// TODO: Add design guidelines

- attribution and licensing
- title / label
- styling
- legends
- query links
- alternate styles
- alternate projections
- content types: tiles, features, images wrt a11y